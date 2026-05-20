from PIL import Image, ImageDraw, ImageFont
import os

def make_icon(size, path):
    img = Image.new('RGBA', (size, size), (13, 13, 26, 255))
    draw = ImageDraw.Draw(img)
    
    # Background circle
    margin = size // 8
    draw.ellipse([margin, margin, size-margin, size-margin], fill=(124, 108, 255, 255))
    
    # Book emoji-style icon
    book_w = size * 0.45
    book_h = size * 0.5
    bx = (size - book_w) // 2
    by = (size - book_h) // 2
    
    # Left page
    draw.rectangle([bx, by, bx + book_w*0.48, by + book_h], fill=(255,255,255,240), outline=(200,190,255,255), width=max(1,size//48))
    # Right page  
    draw.rectangle([bx + book_w*0.52, by, bx + book_w, by + book_h], fill=(255,255,255,240), outline=(200,190,255,255), width=max(1,size//48))
    # Spine
    draw.rectangle([bx + book_w*0.46, by, bx + book_w*0.54, by + book_h], fill=(124,108,255,255))
    
    img.save(path, 'PNG')
    print(f"Created {path} ({size}x{size})")

make_icon(192, 'icon-192.png')
make_icon(512, 'icon-512.png')
