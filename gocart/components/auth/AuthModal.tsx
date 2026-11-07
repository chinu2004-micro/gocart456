'use client';

import * as React from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useCartStore } from '@/lib/stores/useCartStore';
import { registrationSchema, loginSchema } from '@/schemas/velloraSchemas';
import { toast } from 'react-hot-toast';
import { Lock, Mail, User, Phone, MapPin, Sparkles } from 'lucide-react';

export function AuthModal() {
  const { loginModalOpen, closeLoginModal, login, authModalMode, setAuthModalMode } = useAuthStore();
  const mode = authModalMode;
  const setMode = setAuthModalMode;

  const [loginForm, setLoginForm] = React.useState({ identifier: '', password: '' });
  const [registerForm, setRegisterForm] = React.useState({
    name: '',
    userId: '',
    email: '',
    contact: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    termsAccepted: true,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(loginForm);
    if (!result.success) {
      toast.error('Please enter valid credentials.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Failed to sign in');
        setIsLoading(false);
        return;
      }

      login(data.user);
      // Sync guest cart to database account
      await useCartStore.getState().syncWithDatabase();
      toast.success(`Welcome back, ${data.user.name}!`);
      closeLoginModal();
    } catch (err: any) {
      toast.error('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = registrationSchema.safeParse(registerForm);
    if (!result.success) {
      const firstIssue = result.error.issues?.[0]?.message || 'Please fill in all required registration fields correctly.';
      toast.error(firstIssue);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      login(data.user);
      // Sync guest cart to database account
      await useCartStore.getState().syncWithDatabase();
      toast.success('Registration complete! Welcome to Vellora.');
      closeLoginModal();
    } catch (err: any) {
      toast.error('Network error during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={loginModalOpen} onOpenChange={(open) => !open && closeLoginModal()}>
      <ModalContent className="max-w-lg p-7">
        <ModalHeader>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-[#D9B65F]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E4A57] dark:text-[#D9B65F]">
              Vellora Membership
            </span>
          </div>
          <ModalTitle className="text-2xl font-bold font-serif text-[#0E4A57] dark:text-white">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </ModalTitle>
          <ModalDescription className="text-xs">
            {mode === 'login'
              ? 'Access your orders, saved addresses and exclusive seasonal offers.'
              : 'Join Vellora to unlock complimentary insured shipping and verified member privileges.'}
          </ModalDescription>
        </ModalHeader>

        {/* Toggle Mode */}
        <div className="flex rounded-xl bg-[#EFECE6] p-1 text-xs font-semibold dark:bg-[#16363F] my-2">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-[#0E4A57] shadow-sm dark:bg-[#0A1D22] dark:text-white font-bold'
                : 'text-[#727B83]'
            }`}
          >
            Existing Customer
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white text-[#0E4A57] shadow-sm dark:bg-[#0A1D22] dark:text-white font-bold'
                : 'text-[#727B83]'
            }`}
          >
            New Customer
          </button>
        </div>

        {/* Form Body */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">
                User ID or Email
              </label>
              <Input
                icon={<User className="h-4 w-4" />}
                placeholder="Enter User ID or Email"
                value={loginForm.identifier}
                onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">
                Password
              </label>
              <Input
                type="password"
                icon={<Lock className="h-4 w-4" />}
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0E4A57] hover:bg-[#1E8C9B] text-white shadow-md shadow-[#0E4A57]/20 py-3"
            >
              Sign In to Vellora
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 pt-2 max-h-[60vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Full Name</label>
                <Input
                  placeholder="e.g. Priya Sharma"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Choose User ID</label>
                <Input
                  placeholder="e.g. priya_sharma"
                  value={registerForm.userId}
                  onChange={(e) => setRegisterForm({ ...registerForm, userId: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="priya@domain.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Phone (+91)</label>
                <Input
                  placeholder="9876543210"
                  value={registerForm.contact}
                  onChange={(e) => setRegisterForm({ ...registerForm, contact: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Street Address</label>
              <Input
                placeholder="Flat / House / Street name"
                value={registerForm.street}
                onChange={(e) => setRegisterForm({ ...registerForm, street: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">City</label>
                <Input
                  placeholder="City"
                  value={registerForm.city}
                  onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">State</label>
                <Input
                  placeholder="State"
                  value={registerForm.state}
                  onChange={(e) => setRegisterForm({ ...registerForm, state: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Pincode</label>
                <Input
                  placeholder="6 digits"
                  value={registerForm.pincode}
                  onChange={(e) => setRegisterForm({ ...registerForm, pincode: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Password</label>
                <Input
                  type="password"
                  placeholder="Min 8 chars, 1 capital & number"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Re-enter password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0E4A57] hover:bg-[#1E8C9B] text-white shadow-md shadow-[#0E4A57]/20 py-3 mt-2"
            >
              Complete Registration & Sign In
            </Button>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
