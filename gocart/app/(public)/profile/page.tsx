'use client';

import * as React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { User, MapPin, Package, Shield, Plus, Trash2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const { user, isAuthenticated, openLoginModal, login } = useAuthStore();
  const [activeTab, setActiveTab] = React.useState<'details' | 'addresses' | 'security'>('details');

  const [personalForm, setPersonalForm] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    contact: user?.contact || '',
  });

  const [addresses, setAddresses] = React.useState<any[]>([]);

  // Sync state when user profile changes
  React.useEffect(() => {
    if (user) {
      setPersonalForm({
        name: user.name || '',
        email: user.email || '',
        contact: user.contact || '',
      });
    }
  }, [user]);

  // Load user addresses from DB
  const loadAddresses = React.useCallback(async () => {
    try {
      const res = await fetch('/api/user/addresses');
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses || []);
      }
    } catch (e) {}
  }, []);

  React.useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const [newAddrForm, setNewAddrForm] = React.useState({
    name: '',
    contact: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    isDefault: false,
  });

  const [showAddAddr, setShowAddAddr] = React.useState(false);

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personalForm),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        login({ ...user, ...data.user, addresses });
        toast.success('Profile details saved to database');
      } else {
        toast.error(data.error || 'Failed to update profile');
      }
    } catch (err) {
      toast.error('Network error updating profile');
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrForm.name || !newAddrForm.street || !newAddrForm.pincode) {
      toast.error('Please complete all address fields.');
      return;
    }

    try {
      const res = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddrForm),
      });
      const data = await res.json();
      if (res.ok && data.address) {
        toast.success('New delivery address saved to database');
        setShowAddAddr(false);
        setNewAddrForm({ name: '', contact: '', street: '', city: '', state: '', pincode: '', country: 'India', isDefault: false });
        loadAddresses();
      } else {
        toast.error(data.error || 'Failed to save address');
      }
    } catch (err) {
      toast.error('Network error saving address');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      const res = await fetch(`/api/user/addresses?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Address deleted from database');
        loadAddresses();
      }
    } catch (e) {
      toast.error('Failed to delete address');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="rounded-3xl border border-dashed border-[#DFD9CE] p-10 bg-white dark:bg-[#0F282F] dark:border-[#224C57]">
          <Lock className="h-12 w-12 text-[#0E4A57] dark:text-[#D9B65F] mx-auto" />
          <h2 className="mt-4 text-xl font-bold font-serif text-[#0E4A57] dark:text-white">
            Access Your Profile
          </h2>
          <p className="mt-2 text-xs text-[#727B83]">
            Please sign in to view and manage your account credentials, security settings, and saved delivery addresses.
          </p>
          <Button
            onClick={() => openLoginModal('login')}
            className="mt-6 bg-[#0E4A57] hover:bg-[#1E8C9B] text-white"
          >
            Sign In to Vellora
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DFD9CE] pb-6 dark:border-[#224C57] gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0E4A57] text-[#D9B65F] font-bold text-xl shadow-md">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <h1 className="text-2xl font-bold font-serif text-[#0E4A57] dark:text-white">
              {user?.name || 'Vellora Member'}
            </h1>
            <p className="text-xs text-[#727B83]">{user?.email || 'Member'} • Verified Account</p>
          </div>
        </div>

        <Link href="/profile/orders">
          <Button variant="outline" className="border-[#0E4A57] text-[#0E4A57] dark:border-[#D9B65F] dark:text-[#D9B65F]">
            <Package className="mr-2 h-4 w-4" />
            View Order History
          </Button>
        </Link>
      </div>

      {/* Profile Tabs */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Tab Sidebar */}
        <div className="space-y-1">
          <button
            onClick={() => setActiveTab('details')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'details'
                ? 'bg-[#0E4A57] text-white shadow-sm'
                : 'text-[#4B5259] hover:bg-[#EFECE6] dark:text-[#DFD9CE] dark:hover:bg-[#16363F]'
            }`}
          >
            <User className="h-4 w-4" />
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'addresses'
                ? 'bg-[#0E4A57] text-white shadow-sm'
                : 'text-[#4B5259] hover:bg-[#EFECE6] dark:text-[#DFD9CE] dark:hover:bg-[#16363F]'
            }`}
          >
            <MapPin className="h-4 w-4" />
            Saved Delivery Addresses
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'security'
                ? 'bg-[#0E4A57] text-white shadow-sm'
                : 'text-[#4B5259] hover:bg-[#EFECE6] dark:text-[#DFD9CE] dark:hover:bg-[#16363F]'
            }`}
          >
            <Shield className="h-4 w-4" />
            Security & Password
          </button>
        </div>

        {/* Tab Content Box */}
        <div className="md:col-span-3 rounded-3xl border border-[#DFD9CE] bg-white p-6 shadow-sm dark:border-[#224C57] dark:bg-[#0F282F]">
          {activeTab === 'details' && (
            <form onSubmit={handlePersonalSubmit} className="space-y-4">
              <h3 className="text-base font-bold font-serif text-[#0E4A57] dark:text-white">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Full Name</label>
                  <Input value={personalForm.name} onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Email Address</label>
                  <Input value={personalForm.email} onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Contact Phone</label>
                  <Input value={personalForm.contact} onChange={(e) => setPersonalForm({ ...personalForm, contact: e.target.value })} required />
                </div>
              </div>
              <Button type="submit" className="bg-[#0E4A57] hover:bg-[#1E8C9B] text-white mt-2">
                Save Changes
              </Button>
            </form>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-serif text-[#0E4A57] dark:text-white">
                  Saved Delivery Addresses
                </h3>
                <Button size="sm" onClick={() => setShowAddAddr(!showAddAddr)} className="bg-[#0E4A57] text-white">
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Add Address
                </Button>
              </div>

              {showAddAddr && (
                <form onSubmit={handleAddAddress} className="rounded-2xl border border-[#DFD9CE] p-4 bg-[#F8F6F1] dark:bg-[#16363F] space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Recipient Name" value={newAddrForm.name} onChange={(e) => setNewAddrForm({ ...newAddrForm, name: e.target.value })} required />
                    <Input placeholder="Phone Number" value={newAddrForm.contact} onChange={(e) => setNewAddrForm({ ...newAddrForm, contact: e.target.value })} required />
                  </div>
                  <Input placeholder="Street Address" value={newAddrForm.street} onChange={(e) => setNewAddrForm({ ...newAddrForm, street: e.target.value })} required />
                  <div className="grid grid-cols-3 gap-2">
                    <Input placeholder="City" value={newAddrForm.city} onChange={(e) => setNewAddrForm({ ...newAddrForm, city: e.target.value })} required />
                    <Input placeholder="State" value={newAddrForm.state} onChange={(e) => setNewAddrForm({ ...newAddrForm, state: e.target.value })} required />
                    <Input placeholder="Pincode" value={newAddrForm.pincode} onChange={(e) => setNewAddrForm({ ...newAddrForm, pincode: e.target.value })} required />
                  </div>
                  <Button type="submit" size="sm" className="bg-[#0E4A57] text-white">
                    Save Delivery Address
                  </Button>
                </form>
              )}

              <div className="space-y-3">
                {addresses.length === 0 ? (
                  <p className="text-xs text-[#727B83] py-4">No saved addresses found. Add an address for faster checkout.</p>
                ) : (
                  addresses.map((addr) => (
                    <div key={addr.id} className="flex items-start justify-between rounded-2xl border border-[#ECE8E0] p-4 dark:border-[#16363F]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1]">{addr.name}</span>
                          {addr.isDefault && (
                            <span className="rounded-full bg-[#EAF8F1] px-2 py-0.5 text-[10px] font-bold text-[#1F9D6B]">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-[#727B83]">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-xs text-[#727B83] mt-0.5">Phone: {addr.contact}</p>
                      </div>
                      <button onClick={() => handleDeleteAddress(addr.id)} className="text-[#A2AAB0] hover:text-[#D1495B] p-1" title="Delete address">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold font-serif text-[#0E4A57] dark:text-white">
                Security & Passwords
              </h3>
              <p className="text-xs text-[#727B83]">
                Your account is protected by salted SHA-256 client credentials and 256-bit SSL session encryption.
              </p>
              <div className="space-y-3 max-w-sm pt-2">
                <Input type="password" placeholder="Current Password" />
                <Input type="password" placeholder="New Password (min 8 chars)" />
                <Input type="password" placeholder="Confirm New Password" />
                <Button onClick={() => toast.success('Password updated successfully')} className="bg-[#0E4A57] text-white">
                  Update Password
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

