# File Size Optimization Guide

## Current File Sizes (CRITICAL ISSUE!)

### Video
- **File**: `public/kshitij-aftermovie.mp4`
- **Size**: **2.31 GB (2,368 MB)** ⚠️
- **Issue**: Extremely large for web use - should be 20-50 MB

### Photos (public/photos/*.JPG)
- **Individual Size**: **8-44 MB per image** ⚠️
- **Total**: ~800+ MB for all photos
- **Issue**: Each image is 10-50x larger than it should be
- **Target**: 500KB - 2MB per image

### Event Posters ✅ (Already Optimized!)
- **Location**: `public/Events Poster_KTJ_25/*.jpeg`
- **Current Size**: 0.15-0.47 MB per image
- **Status**: ✅ Already well-optimized! No action needed.

### Sponsor Logos ✅ (Already Optimized!)
- **Location**: `public/Sponsers Logo/*`
- **Current Size**: 0.01-0.1 MB per logo
- **Status**: ✅ Already well-optimized! No action needed.

---

## 🎥 Video Optimization (CRITICAL - 2.31 GB is too large!)

### Recommended Size: 10-50 MB for web background video

### Option 1: Use HandBrake (Free, Recommended)
1. Download HandBrake: https://handbrake.fr/
2. Open your original video file
3. **Preset**: Choose "Web > Gmail Large 3 Minutes 720p30"
4. **Settings**:
   - **Video Codec**: H.264 (x264)
   - **Framerate**: 30 fps (or 24 fps for smaller size)
   - **Quality**: RF 23-28 (higher = smaller file, lower quality)
   - **Resolution**: 1920x1080 (1080p) or 1280x720 (720p)
   - **Bitrate**: 2-5 Mbps
5. **Output**: Save as `kshitij-aftermovie-optimized.mp4`
6. **Expected Result**: 20-50 MB (95-98% reduction!)

### Option 2: Use FFmpeg (Command Line)
```bash
ffmpeg -i "IIT KGP Kshitij Aftermovie4K .mp4" \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -vf "scale=1920:1080" \
  -r 30 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  "kshitij-aftermovie-optimized.mp4"
```

### Option 3: Online Tools
- **CloudConvert**: https://cloudconvert.com/
- **FreeConvert**: https://www.freeconvert.com/
- Upload → Convert to MP4 → Set quality to "Medium" or "Low"

### Option 4: Use a Shorter Clip
- Extract 30-60 seconds from the video
- Use that as a looping background
- Much smaller file size

---

## 🖼️ Image Optimization

### Photos (public/photos/*.JPG)

#### Option 1: Use ImageOptim/ImageMagick (Batch Processing)
```bash
# Using ImageMagick (install first)
magick mogrify -resize 1920x1080^ -quality 85 -strip "public/photos/*.JPG"
```

#### Option 2: Use Online Tools (Batch)
- **Squoosh**: https://squoosh.app/ (Google's tool)
- **TinyPNG/TinyJPG**: https://tinypng.com/ (Batch upload)
- **Compressor.io**: https://compressor.io/

#### Option 3: Use Photoshop/Photopea (Free)
1. Open images
2. **File → Export → Save for Web (Legacy)**
3. **Format**: JPEG
4. **Quality**: 70-85%
5. **Dimensions**: Max 1920px width
6. **Optimize**: Checked

#### Option 4: Use Next.js Image Optimization (Already Enabled)
- Next.js automatically optimizes images
- But source files should still be reasonable size
- **Target**: 500KB - 2MB per image max

### Event Posters (public/Events Poster_KTJ_25/*.jpeg)

**Recommended Settings:**
- **Max Width**: 1200px
- **Quality**: 80-85%
- **Format**: JPEG or WebP
- **Target Size**: 200-500 KB per image

### Sponsor Logos (public/Sponsers Logo/*)

**Recommended Settings:**
- **Max Width**: 400px (logos don't need to be huge)
- **Quality**: 90-95% (logos need to be sharp)
- **Format**: PNG for logos with transparency, JPEG for photos
- **Target Size**: 50-200 KB per logo

---

## 📊 Recommended File Sizes

| File Type | Current | Target | Reduction | Tool |
|-----------|---------|--------|-----------|------|
| Background Video | **2.31 GB** | 20-50 MB | **95-98%** | HandBrake/FFmpeg |
| Gallery Photos | **8-44 MB each** | 500KB-2MB | **90-95%** | ImageMagick/Squoosh |
| Event Posters | 0.15-0.47 MB | ✅ Good | - | No action needed |
| Sponsor Logos | 0.01-0.1 MB | ✅ Good | - | No action needed |

---

## 🚀 Quick Action Plan

### Priority 1: Video (Most Critical)
1. **Download HandBrake** (free)
2. Compress video to 1080p, 30fps, RF 26
3. Replace `public/kshitij-aftermovie.mp4` with optimized version
4. **Expected improvement**: 95%+ size reduction

### Priority 2: Gallery Photos (CRITICAL - 8-44 MB each!)
1. **Batch compress photos** using Squoosh or ImageMagick
2. **Resize to max 1920px width** (most are probably 4000px+)
3. **Quality 80-85%**
4. **Target**: Reduce from 8-44 MB to 500KB-2MB each
5. Replace original files in `public/photos/`

### Priority 3: Event Posters & Logos
1. Compress event posters to 1200px max width
2. Compress logos to 400px max width
3. Use appropriate quality settings

---

## 💡 Pro Tips

1. **Keep Originals**: Always keep original files as backup
2. **Test Quality**: Check compressed files look good before replacing
3. **Progressive Loading**: Next.js Image component handles this, but smaller files = faster
4. **CDN Consideration**: For production, consider using a CDN for video
5. **Video Alternatives**: Consider using a shorter clip or lower resolution

---

## ⚠️ Important Notes

- **Video at 2.31 GB will cause severe performance issues**
- **Large images slow down initial page load**
- **Next.js Image optimization helps, but source files should be reasonable**
- **Vercel has file size limits** - very large files may cause deployment issues

---

## 🛠️ Tools Summary

| Tool | Type | Best For | Cost |
|------|------|----------|------|
| HandBrake | Desktop | Video compression | Free |
| FFmpeg | CLI | Video/Image batch | Free |
| Squoosh | Web | Image optimization | Free |
| TinyPNG | Web | Batch image compression | Free (limited) |
| ImageMagick | CLI | Batch image processing | Free |
| Photoshop | Desktop | Professional editing | Paid |
| Photopea | Web | Photoshop alternative | Free |

---

## 📝 After Optimization

Once you've optimized the files:
1. Replace the files in the `public` directory
2. Test the website performance
3. Check that quality is acceptable
4. The site should load much faster!

**Expected Performance Improvement:**
- Video: 95%+ smaller → Much faster loading
- Images: 70-90% smaller → Faster page loads
- Overall: Significantly improved user experience

