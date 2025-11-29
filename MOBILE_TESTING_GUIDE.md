# Mobile Responsive Testing Guide

## How to Test Locally

### 1. Start Your Local Server
```bash
npm start
# or
node server.js
```

Your portfolio should be running at `http://localhost:3000`

### 2. Test in Browser DevTools

#### Chrome/Edge DevTools:
1. Open `http://localhost:3000`
2. Press `F12` or `Ctrl+Shift+I` to open DevTools
3. Click the **Toggle Device Toolbar** icon (or press `Ctrl+Shift+M`)
4. Select different devices from the dropdown:
   - iPhone SE (375x667)
   - iPhone 12 Pro (390x844)
   - iPad (768x1024)
   - iPad Pro (1024x1366)

#### Firefox DevTools:
1. Open `http://localhost:3000`
2. Press `F12` to open DevTools
3. Click **Responsive Design Mode** icon (or press `Ctrl+Shift+M`)
4. Test different screen sizes

### 3. What to Test

#### ✅ Mobile Menu (< 768px)
- [ ] Hamburger icon appears on mobile
- [ ] Desktop navigation is hidden
- [ ] Click hamburger - menu slides in from right
- [ ] Hamburger animates to X when active
- [ ] Dark overlay appears behind menu
- [ ] Click overlay - menu closes
- [ ] Click menu link - menu closes and scrolls to section
- [ ] Menu items are easily tappable (not too small)

#### ✅ Header (All Sizes)
- [ ] Logo is visible and readable
- [ ] Theme toggle works
- [ ] Language selector works
- [ ] Header is sticky on scroll
- [ ] No horizontal scrolling

#### ✅ Home Section
- [ ] **Desktop (>768px)**: Image and content side-by-side
- [ ] **Mobile (<768px)**: Image and content stacked vertically
- [ ] Text is readable (not too small)
- [ ] Buttons are full-width on small phones
- [ ] Buttons are easily tappable

#### ✅ About Section
- [ ] Card fits within screen width
- [ ] Text is readable
- [ ] Section links wrap properly on mobile
- [ ] No content overflow

#### ✅ Skills Section
- [ ] Skill cards stack on mobile
- [ ] "Show More Details" button works
- [ ] All badges are visible
- [ ] Progress bars animate correctly

#### ✅ Projects Section
- [ ] Project cards stack on mobile
- [ ] Tech tags wrap properly
- [ ] All text is readable
- [ ] Cards don't overflow

#### ✅ Contact Form
- [ ] Form is full width on mobile
- [ ] Input fields are large enough to tap
- [ ] Submit button is full width
- [ ] Form submission works

#### ✅ Footer
- [ ] Social icons are visible and tappable
- [ ] Footer links are readable
- [ ] Footer fits within screen width

#### ✅ Touch Device Features
- [ ] Custom cursor is disabled on touch devices
- [ ] No cursor: none issues on mobile
- [ ] All hover effects work or are disabled appropriately

### 4. Test Different Breakpoints

Test at these specific widths:
- **1920px** - Large desktop (should look normal)
- **1024px** - Tablet landscape (slight adjustments)
- **768px** - Tablet portrait (hamburger menu appears)
- **480px** - Large phone (buttons stack, smaller text)
- **375px** - iPhone size (most common mobile size)
- **360px** - Small Android phone (smallest supported)

### 5. Common Issues to Check

❌ **Horizontal Scrolling**
- Scroll left/right on each page
- Should NOT be able to scroll horizontally at any size

❌ **Text Too Small**
- All text should be at least 14px on mobile
- Headings should be proportionally sized

❌ **Buttons Too Small**
- All tap targets should be at least 44x44px
- Buttons should be easy to tap with thumb

❌ **Content Overflow**
- No text or images should overflow their containers
- Cards should fit within screen width

❌ **Menu Not Working**
- If hamburger doesn't work, check browser console for errors
- Make sure JavaScript is loaded

### 6. Browser Console

Keep the console open while testing:
- Press `F12` → Console tab
- Look for any errors (red text)
- Report any errors you see

### 7. Performance Check

On mobile view:
- Page should load quickly
- Animations should be smooth
- No lag when opening/closing menu
- Scrolling should be smooth

## Quick Test Checklist

For a quick test, just verify:
1. ✅ Open on mobile size (375px)
2. ✅ Hamburger menu appears and works
3. ✅ All sections are readable
4. ✅ Contact form works
5. ✅ No horizontal scrolling

## Report Issues

If you find any issues, note:
- Screen size where issue occurs
- What's wrong (screenshot helps)
- Which browser you're using

---

**Ready to push?** Let me know when you've tested and I'll commit and push the changes!
