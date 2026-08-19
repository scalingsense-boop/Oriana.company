from PIL import Image, ImageDraw, ImageFont
import os

ASSETS = os.path.dirname(os.path.abspath(__file__))
FONT_HEAD = os.path.join(ASSETS, "fonts", "CormorantGaramond.ttf")
FONT_BODY = os.path.join(ASSETS, "fonts", "Inter.ttf")
OUT = os.path.join(ASSETS, "out")
os.makedirs(OUT, exist_ok=True)

GOLD = (232, 185, 35, 255)
CHAMPAGNE = (255, 210, 77, 255)
ROSE = (241, 104, 86, 255)
PINK = (224, 64, 125, 255)
PINK_LIGHT = (255, 158, 199, 255)
INK = (42, 31, 18, 255)
CREAM = (255, 251, 242, 255)
WHITE = (255, 255, 255, 255)


def head_font(size, weight="SemiBold"):
    f = ImageFont.truetype(FONT_HEAD, size)
    f.set_variation_by_name(weight)
    return f


def body_font(size, weight="Medium"):
    f = ImageFont.truetype(FONT_BODY, size)
    f.set_variation_by_name(weight)
    return f


def draw_tracked_text(im, xy, text, font, fill, tracking=0, anchor_center_x=None):
    """Draw text with manual letter-spacing (PIL has no native tracking).
    If anchor_center_x is given, xy's x is ignored and the text is
    horizontally centered on that x instead."""
    d = ImageDraw.Draw(im)
    widths = [d.textlength(ch, font=font) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = (anchor_center_x - total / 2) if anchor_center_x is not None else xy[0]
    y = xy[1]
    for ch, w in zip(text, widths):
        d.text((x, y), ch, font=font, fill=fill)
        x += w + tracking
    return total


def draw_icon_mark(size, color=GOLD):
    """The Oriana monogram: the serif 'O' from Cormorant Garamond (so it
    reads as Oriana's own letterform, not a generic ring), with a diamond
    jewel in its counter and the site's flanking-line divider motif
    running through its waist."""
    scale = 4
    s = size * scale
    im = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    cx = cy = s / 2

    f = ImageFont.truetype(FONT_HEAD, round(s * 1.02))
    f.set_variation_by_name("Bold")
    bbox = d.textbbox((0, 0), "O", font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1]), "O", font=f, fill=color)

    ring_r = s * 0.30
    stroke = max(2, round(s * 0.026))
    line_len = s * 0.10
    gap = s * 0.015
    d.line([(cx - ring_r - gap - line_len, cy), (cx - ring_r - gap, cy)], fill=color, width=stroke)
    d.line([(cx + ring_r + gap, cy), (cx + ring_r + gap + line_len, cy)], fill=color, width=stroke)

    dia = s * 0.055
    d.polygon([(cx, cy - dia), (cx + dia, cy), (cx, cy + dia), (cx - dia, cy)], fill=color)

    return im.resize((size, size), Image.LANCZOS)


def draw_icon_mark_simple(size, color=GOLD, bg=None):
    """Simplified mark for tiny sizes (favicons, browser tabs) where the
    flanking lines and diamond would just blur into noise - bold O only,
    with the diamond kept just large enough to survive downscaling."""
    scale = 8
    s = size * scale
    im = Image.new("RGBA", (s, s), bg if bg else (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    cx = cy = s / 2

    f = ImageFont.truetype(FONT_HEAD, round(s * 1.06))
    f.set_variation_by_name("Bold")
    bbox = d.textbbox((0, 0), "O", font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1]), "O", font=f, fill=color)

    dia = s * 0.09
    d.polygon([(cx, cy - dia), (cx + dia, cy), (cx, cy + dia), (cx - dia, cy)], fill=color)

    return im.resize((size, size), Image.LANCZOS)


def linear_gradient(size, stops):
    """stops: list of (position 0-1, RGB) along a diagonal (120deg-ish, matching --grad-vivid)."""
    w, h = size
    base = Image.new("RGB", (w, h))
    px = base.load()
    import math
    angle = math.radians(115)
    dx, dy = math.cos(angle), math.sin(angle)
    proj = [x * dx + y * dy for x in (0, w) for y in (0, h)]
    pmin, pmax = min(proj), max(proj)

    def color_at(t):
        for i in range(len(stops) - 1):
            p0, c0 = stops[i]
            p1, c1 = stops[i + 1]
            if p0 <= t <= p1:
                local = 0 if p1 == p0 else (t - p0) / (p1 - p0)
                return tuple(round(c0[k] + (c1[k] - c0[k]) * local) for k in range(3))
        return stops[-1][1]

    for y in range(h):
        for x in range(0, w, 2):
            p = (x * dx + y * dy - pmin) / (pmax - pmin)
            c = color_at(p)
            for xx in range(x, min(x + 2, w)):
                px[xx, y] = c
    return base.convert("RGBA")


def paste_center(base, layer, cx, cy):
    x = round(cx - layer.width / 2)
    y = round(cy - layer.height / 2)
    base.alpha_composite(layer, (x, y))


def lockup_horizontal(mark_color=GOLD, text_color=GOLD, tag_color=INK, height=400, transparent=True, bg=None):
    scale = 3
    h = height * scale
    icon_size = round(h * 0.92)
    icon = draw_icon_mark(icon_size, mark_color)

    word_f = head_font(round(h * 0.62), "SemiBold")
    tag_f = body_font(round(h * 0.11), "SemiBold")

    tmp = Image.new("RGBA", (10, 10))
    td = ImageDraw.Draw(tmp)
    word = "Oriana"
    word_w = td.textlength(word, font=word_f)
    word_bbox = td.textbbox((0, 0), word, font=word_f)
    word_h = word_bbox[3] - word_bbox[1]

    tag = "EVENT DECOR · LAHORE"
    tag_tracking = h * 0.018
    tag_widths = [td.textlength(ch, font=tag_f) for ch in tag]
    tag_w = sum(tag_widths) + tag_tracking * (len(tag) - 1)

    gap_icon_word = h * 0.10
    text_block_w = max(word_w, tag_w)
    total_w = round(icon_size + gap_icon_word + text_block_w + h * 0.06)

    canvas = Image.new("RGBA", (total_w, h), (0, 0, 0, 0) if transparent else bg)
    paste_center(canvas, icon, icon_size / 2 + h * 0.02, h / 2)

    text_x = icon_size + gap_icon_word
    word_y = h * 0.5 - word_h * 0.72
    canvas_d = ImageDraw.Draw(canvas)
    canvas_d.text((text_x - word_bbox[0], word_y - word_bbox[1]), word, font=word_f, fill=text_color)

    tag_y = h * 0.5 + h * 0.20
    draw_tracked_text(canvas, (text_x, tag_y), tag, tag_f, tag_color, tracking=tag_tracking)

    canvas = canvas.crop(canvas.getbbox() if transparent else (0, 0, total_w, h))
    return canvas.resize((max(1, canvas.width // scale), max(1, canvas.height // scale)), Image.LANCZOS)


def lockup_stacked(mark_color=GOLD, text_color=GOLD, tag_color=INK, width=900, with_tagline=True, transparent=True, bg=None):
    scale = 3
    w = width * scale
    icon_size = round(w * 0.34)
    icon = draw_icon_mark(icon_size, mark_color)

    word_f = head_font(round(w * 0.20), "SemiBold")
    tag_f = body_font(round(w * 0.032), "SemiBold")

    tmp = Image.new("RGBA", (10, 10))
    td = ImageDraw.Draw(tmp)
    word = "Oriana"
    word_bbox = td.textbbox((0, 0), word, font=word_f)
    word_w = word_bbox[2] - word_bbox[0]
    word_h = word_bbox[3] - word_bbox[1]

    tag = "EVENT DECOR · LAHORE"
    tag_tracking = w * 0.006
    tag_widths = [td.textlength(ch, font=tag_f) for ch in tag]
    tag_w = sum(tag_widths) + tag_tracking * (len(tag) - 1)

    gap1 = w * 0.05
    gap2 = w * 0.045
    total_h = round(icon_size + gap1 + word_h + (gap2 + w * 0.045 if with_tagline else 0))
    canvas_w = round(max(icon_size, word_w, tag_w) + w * 0.06)

    canvas = Image.new("RGBA", (canvas_w, total_h), (0, 0, 0, 0) if transparent else bg)
    cx = canvas_w / 2
    y = 0
    paste_center(canvas, icon, cx, icon_size / 2)
    y = icon_size + gap1

    canvas_d = ImageDraw.Draw(canvas)
    canvas_d.text((cx - word_w / 2 - word_bbox[0], y - word_bbox[1]), word, font=word_f, fill=text_color)
    y += word_h

    if with_tagline:
        y += gap2
        draw_tracked_text(canvas, (0, y), tag, tag_f, tag_color, tracking=tag_tracking, anchor_center_x=cx)

    bbox = canvas.getbbox()
    canvas = canvas.crop(bbox) if transparent else canvas
    return canvas.resize((max(1, canvas.width // scale), max(1, canvas.height // scale)), Image.LANCZOS)


def save(im, name):
    path = os.path.join(OUT, name)
    im.save(path)
    print("saved", name, im.size)


def social_profile_picture(size=1080):
    bg = linear_gradient((size, size), [(0.0, GOLD[:3]), (0.45, ROSE[:3]), (0.75, PINK[:3]), (1.0, PINK_LIGHT[:3])])
    canvas = bg.convert("RGBA")
    # keep the mark inside the circular safe-zone platforms crop profile pics to
    mark = draw_icon_mark(round(size * 0.56), CREAM)
    paste_center(canvas, mark, size / 2, size / 2)
    return canvas


def social_cover(w, h, with_tagline=True):
    bg = linear_gradient((w, h), [(0.0, GOLD[:3]), (0.45, ROSE[:3]), (0.75, PINK[:3]), (1.0, PINK_LIGHT[:3])])
    canvas = bg.convert("RGBA")
    lockup = lockup_horizontal(CREAM, CREAM, (255, 255, 255, 215), height=round(h * (0.5 if with_tagline else 0.4)))
    paste_center(canvas, lockup, w / 2, h / 2)
    return canvas


def favicon_ico():
    sizes = [16, 32, 48]
    imgs = [draw_icon_mark_simple(s, GOLD) for s in sizes]
    imgs[0].save(os.path.join(OUT, "favicon.ico"), format="ICO", sizes=[(s, s) for s in sizes], append_images=imgs[1:])
    print("saved favicon.ico")


if __name__ == "__main__":
    # --- Core icon mark ---
    for sz in (32, 48):
        save(draw_icon_mark_simple(sz, GOLD), f"icon-mark-gold-{sz}.png")
    for sz in (64, 128, 192, 256, 512, 1024):
        save(draw_icon_mark(sz, GOLD), f"icon-mark-gold-{sz}.png")
    save(draw_icon_mark(512, CREAM), "icon-mark-cream-512.png")
    save(draw_icon_mark(512, WHITE), "icon-mark-white-512.png")
    save(draw_icon_mark(512, INK), "icon-mark-ink-512.png")

    # --- Horizontal lockup (header / wide contexts) ---
    save(lockup_horizontal(GOLD, GOLD, (74, 63, 51, 255), height=500), "logo-horizontal-transparent.png")
    save(lockup_horizontal(WHITE, WHITE, (255, 255, 255, 200), height=500), "logo-horizontal-white-transparent.png")

    horiz_cream = lockup_horizontal(GOLD, GOLD, (74, 63, 51, 255), height=500, transparent=False, bg=CREAM)
    pad = 60
    canvas = Image.new("RGBA", (horiz_cream.width + pad * 2, horiz_cream.height + pad * 2), CREAM)
    canvas.alpha_composite(horiz_cream, (pad, pad))
    save(canvas, "logo-horizontal-on-cream.png")

    horiz_dark = lockup_horizontal(GOLD, WHITE, (232, 210, 180, 255), height=500, transparent=False, bg=INK)
    canvas = Image.new("RGBA", (horiz_dark.width + pad * 2, horiz_dark.height + pad * 2), INK)
    canvas.alpha_composite(horiz_dark, (pad, pad))
    save(canvas, "logo-horizontal-on-dark.png")

    # --- Stacked lockup (square contexts) ---
    save(lockup_stacked(GOLD, GOLD, (74, 63, 51, 255), width=1000), "logo-stacked-transparent.png")
    save(lockup_stacked(GOLD, GOLD, (74, 63, 51, 255), width=1000, with_tagline=False), "logo-stacked-no-tagline-transparent.png")

    # --- Favicon ---
    favicon_ico()

    # --- Social media ---
    save(social_profile_picture(1080), "social-profile-picture-1080x1080.png")
    save(social_cover(820, 312), "social-facebook-cover-820x312.png")
    save(social_cover(1500, 500), "social-twitter-x-header-1500x500.png")
    save(social_cover(1584, 396), "social-linkedin-cover-1584x396.png")
    save(social_cover(1080, 1080, with_tagline=False), "social-instagram-post-1080x1080.png")
