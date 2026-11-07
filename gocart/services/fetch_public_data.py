import urllib.request
import json
import re

def to_slug(text):
    clean = re.sub(r'[^a-zA-Z0-9]+', '-', text.lower()).strip('-')
    return clean or 'item'

cats_map = {
    'beauty': ('Health & Personal Care', 'Personal Care'),
    'fragrances': ('Health & Personal Care', 'Fragrances'),
    'furniture': ('Home & Living', 'Furniture'),
    'home-decoration': ('Home & Living', 'Home Decor'),
    'kitchen-accessories': ('Home & Living', 'Kitchenware'),
    'laptops': ('Consumer Electronics', 'Computers & Laptops'),
    'mens-shirts': ('Clothing', 'Men Topwear'),
    'mens-shoes': ('Clothing', 'Men Footwear'),
    'mens-watches': ('Consumer Electronics', 'Wearables'),
    'mobile-accessories': ('Consumer Electronics', 'Audio & Accessories'),
    'groceries': ('Gourmet & Grocery', 'Pantry & Organic'),
    'skin-care': ('Health & Personal Care', 'Skincare'),
    'sports-accessories': ('Sports & Outdoors', 'Fitness & Gear'),
    'sunglasses': ('Clothing', 'Fashion Accessories'),
    'tablets': ('Consumer Electronics', 'Tablets & E-Readers'),
    'womens-bags': ('Clothing', 'Women Accessories'),
    'womens-dresses': ('Clothing', 'Women Ethnic & Western'),
    'womens-jewellery': ('Clothing', 'Fine Jewellery'),
    'womens-shoes': ('Clothing', 'Women Footwear'),
    'womens-watches': ('Consumer Electronics', 'Wearables')
}

url = 'https://dummyjson.com/products?limit=194'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    raw = json.loads(resp.read().decode('utf-8'))['products']

converted = []
for p in raw:
    cat = p.get('category', '')
    top_cat, sub_cat = cats_map.get(cat, ('Curated Goods', cat.replace('-', ' ').title()))
    inr_paise = int(round(p.get('price', 10) * 85 * 100))
    discount = float(p.get('discountPercentage', 10.0))
    mrp_paise = int(round(inr_paise / (1 - (discount / 100.0)))) if discount < 90 else inr_paise
    
    slug = f"{to_slug(p.get('title', 'product'))}-{p.get('id')}"
    warranty = p.get('warrantyInformation', '1 Year Standard Brand Warranty')
    shipping = p.get('shippingInformation', 'Complimentary Express Dispatch')
    return_pol = p.get('returnPolicy', '15 days hassle-free return window')

    item = {
        'id': f"dj-{p.get('id')}",
        'slug': slug,
        'name': p.get('title'),
        'brand': p.get('brand') or 'Vellora Essentials',
        'shortDescription': p.get('description', '')[:130] + '...',
        'longDescription': p.get('description', '') + f" Curated and quality-verified under Vellora General Shopping standards with {warranty}.",
        'specifications': {
            'Weight': f"{p.get('weight', 1)} kg",
            'Warranty': warranty,
            'Shipping': shipping,
            'Return Policy': return_pol
        },
        'images': p.get('images', []) if len(p.get('images', [])) > 0 else ([p.get('thumbnail')] if p.get('thumbnail') else []),
        'mrp': mrp_paise,
        'price': inr_paise,
        'discountPercent': int(round(discount)),
        'ratingAvg': float(p.get('rating', 4.5)),
        'ratingCount': len(p.get('reviews', [])) * 14 + 23,
        'stockQuantity': int(p.get('stock', 25)),
        'category': top_cat,
        'subCategory': sub_cat,
        'clothingGender': 'Men' if 'mens' in cat else ('Women' if 'women' in cat else None),
        'tags': p.get('tags', []) + [top_cat.lower(), sub_cat.lower(), 'public-catalog'],
        'createdAt': '2026-03-01T00:00:00Z',
        'popularityScore': int(p.get('rating', 4.5) * 20),
        'gstRate': 18 if top_cat == 'Consumer Electronics' else 12
    }
    converted.append(item)

with open('c:/Projects/gocart456/gocart/services/importedProducts.json', 'w', encoding='utf-8') as f:
    json.dump(converted, f, indent=2)

print(f'Done! Successfully saved {len(converted)} products into importedProducts.json')

