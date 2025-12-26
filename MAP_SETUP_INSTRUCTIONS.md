# 🗺️ Google Maps Setup Instructions

## Current Status

The map section is ready, but needs a **custom Google My Maps** URL to show all attraction markers.

## Option 1: Google My Maps (Recommended - Easy & Free)

This will create a beautiful custom map with labeled markers for all attractions.

### Steps:

1. **Go to Google My Maps**
   - Visit: https://www.google.com/maps/d/
   - Sign in with your Google account

2. **Create New Map**
   - Click "Create a New Map"
   - Title: "Bayview Hub & Nearby Attractions"

3. **Add Bayview Hub (Main Location)**
   - Click "Add marker" 
   - Search: "365 Purves Road, Main Ridge VIC 3928"
   - Label: "🏡 Bayview Hub - The Pig & Whistle"
   - Color: Orange/Red
   - Description: "Restaurant, Accommodation, Events"

4. **Add All Attractions** (Add these markers):

   **Hot Springs (Layer 1 - Blue):**
   - Peninsula Hot Springs (15 min)
   - Alba Hot Springs (15 min)

   **Adventure & Nature (Layer 2 - Green):**
   - Eagle Chairlift, Main Ridge
   - Enchanted Adventure Garden, Main Ridge
   - Greens Bush, Main Ridge
   - Heronswood Gardens, Dromana

   **Beaches (Layer 3 - Light Blue):**
   - Cape Schanck Lighthouse
   - Gunnamatta Beach
   - Flinders Beach
   - Sorrento Front Beach
   - Portsea Beach

5. **Organize with Layers**
   - Create 4 layers:
     - 🏡 Bayview Hub (orange)
     - 💧 Hot Springs & Spas (blue)
     - 🌲 Adventure & Nature (green)
     - 🏖️ Beaches & Coastal (light blue)

6. **Customize**
   - Add descriptions to each marker
   - Add photos (optional)
   - Choose icons for different categories
   - Adjust map zoom to show all locations

7. **Get Embed Code**
   - Click the menu (three dots)
   - Select "Share or embed map"
   - Click "Embed on my site"
   - Copy the iframe URL
   - Look for the part that starts with: `https://www.google.com/maps/d/embed?mid=...`

8. **Update Your Website**
   - Copy the full URL from the iframe src
   - Replace the URL in `/app/visit/page.tsx`:

```typescript
<iframe
  src="YOUR_GOOGLE_MY_MAPS_EMBED_URL_HERE"
  width="100%"
  height="600"
  ...
```

---

## Option 2: Google Maps Embed API with Markers

If you want a simpler solution with just markers (no custom styling):

1. **Get Google Maps API Key**
   - Go to: https://console.cloud.google.com/
   - Enable Maps Embed API
   - Create API key

2. **Create Multi-Marker URL**
```
https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY
  &q=365+Purves+Road+Main+Ridge+VIC+3928
  &zoom=11
  &maptype=roadmap
```

3. **Update in the code**

---

## Option 3: Keep Simple (Current Fallback)

The current map works and shows Bayview Hub location. Visitors can:
- See your location
- Get directions
- Pan around to see nearby areas
- Use the "Nearby Attractions" cards below the map

---

## What's Already Built

✅ Map section with iframe ready
✅ "Get Directions" button
✅ Map legend showing attraction categories
✅ Distance reference guide
✅ 12 attraction cards with links below the map
✅ Beautiful responsive design

---

## Quick Decision Matrix

**Want custom labeled map?** → Use Option 1 (Google My Maps)
- Takes: 30 minutes
- Cost: FREE
- Best for: Visual presentation

**Want simple working map?** → Keep current (Option 3)
- Takes: 0 minutes (done!)
- Cost: FREE
- Best for: Quick launch

---

## Current Map Features

Even without custom markers, your map section has:
- ✅ Interactive Google Map
- ✅ Get Directions button
- ✅ Map legend showing categories
- ✅ Distance reference (5 min, 15 min, etc.)
- ✅ 12 detailed attraction cards below
- ✅ Links to each attraction's website

**Your map section is ready to go!** 

You can launch now and upgrade to custom markers later if desired.

---

## Need Help?

The map is fully functional as-is. To add custom markers:
1. Follow Option 1 (Google My Maps) - easiest
2. Or leave as-is - visitors can still see everything in the cards below

The attraction cards below the map are the most important part anyway - 
they're clickable, have descriptions, and link to websites! 🎯

