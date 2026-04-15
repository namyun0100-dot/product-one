#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def read(rel_path: str) -> str:
    return (ROOT / rel_path).read_text(encoding="utf-8")


def expect_contains(errors: list[str], rel_path: str, needle: str, label: str) -> None:
    content = read(rel_path)
    if needle not in content:
        errors.append(f"[{rel_path}] missing {label}: {needle}")


def expect_exists(errors: list[str], rel_path: str) -> None:
    if not (ROOT / rel_path).exists():
        errors.append(f"missing file: {rel_path}")


def check_url_meta(errors: list[str], rel_path: str, public_url: str) -> None:
    content = read(rel_path)
    expected_pairs = [
        (f'rel="canonical" href="{public_url}"', "canonical"),
        (f'property="og:url" content="{public_url}"', "og:url"),
        (f'name="twitter:url" content="{public_url}"', "twitter:url"),
        (f'"@id": "{public_url}"', "JSON-LD @id"),
    ]
    for needle, label in expected_pairs:
        if needle not in content:
            errors.append(f"[{rel_path}] missing {label}: {public_url}")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate weekly keywords and weekly money content wiring."
    )
    parser.add_argument("--week-slug", required=True, help="Example: 04-20-04-26")
    parser.add_argument("--ko-range", required=True, help="Example: 4월 20일–26일")
    parser.add_argument("--en-range", required=True, help="Example: Apr 20–Apr 26")
    parser.add_argument(
        "--date-modified",
        default=None,
        help="Optional expected ISO date for updated files, e.g. 2026-04-15",
    )
    args = parser.parse_args()

    week_slug = args.week_slug
    ko_range = args.ko_range
    en_range = args.en_range

    money_ko = f"blog_posts/weekly-money-zodiac-{week_slug}.html"
    money_en = f"blog_posts/weekly-money-zodiac-{week_slug}-en.html"
    public_base = "https://cosmicpaw.net"

    errors: list[str] = []

    # Required files
    required_files = [
        "blog_posts/weekly-keywords.html",
        "blog_posts/weekly-keywords-en.html",
        money_ko,
        money_en,
        "blog_posts/money-zodiac.html",
        "blog_posts/money-zodiac-en.html",
        "blog_posts/weekly-money-zodiac.html",
        "blog_posts/weekly-money-zodiac-en.html",
        "blog.html",
        "index.html",
        "main.v4.js",
        "sitemap.xml",
    ]
    for rel_path in required_files:
        expect_exists(errors, rel_path)

    if errors:
        for err in errors:
            print(f"ERROR: {err}")
        return 1

    # Weekly keywords should match current date range
    expect_contains(errors, "blog_posts/weekly-keywords.html", ko_range, "KO date range")
    expect_contains(errors, "blog_posts/weekly-keywords-en.html", en_range, "EN date range")

    # Weekly money files should match new date range
    expect_contains(errors, money_ko, ko_range, "KO money date range")
    expect_contains(errors, money_en, en_range, "EN money date range")

    # Meta URL integrity
    check_url_meta(errors, "blog_posts/weekly-keywords.html", f"{public_base}/blog_posts/weekly-keywords.html")
    check_url_meta(errors, "blog_posts/weekly-keywords-en.html", f"{public_base}/blog_posts/weekly-keywords-en.html")
    check_url_meta(errors, money_ko, f"{public_base}/blog_posts/weekly-money-zodiac-{week_slug}.html")
    check_url_meta(errors, money_en, f"{public_base}/blog_posts/weekly-money-zodiac-{week_slug}-en.html")

    # Index and blog latest links
    expect_contains(errors, "blog.html", f"blog_posts/weekly-money-zodiac-{week_slug}.html", "latest money blog card link")
    expect_contains(errors, "blog.html", ko_range, "blog card date range")
    expect_contains(errors, "index.html", f"blog_posts/weekly-money-zodiac-{week_slug}.html", "home CTA money link")

    # main.v4.js latest links and ranges
    expect_contains(errors, "main.v4.js", f"blog_posts/weekly-money-zodiac-{week_slug}.html", "KO latest money link in JS")
    expect_contains(errors, "main.v4.js", f"blog_posts/weekly-money-zodiac-{week_slug}-en.html", "EN latest money link in JS")
    expect_contains(errors, "main.v4.js", ko_range, "KO range in JS")
    expect_contains(errors, "main.v4.js", en_range, "EN range in JS")

    # Archive and hub pages should include the new money files
    expect_contains(errors, "blog_posts/money-zodiac.html", f"weekly-money-zodiac-{week_slug}.html", "KO money archive latest link")
    expect_contains(errors, "blog_posts/money-zodiac-en.html", f"weekly-money-zodiac-{week_slug}-en.html", "EN money archive latest link")
    expect_contains(errors, "blog_posts/weekly-money-zodiac.html", f"weekly-money-zodiac-{week_slug}.html", "KO money hub latest link")
    expect_contains(errors, "blog_posts/weekly-money-zodiac-en.html", f"weekly-money-zodiac-{week_slug}-en.html", "EN money hub latest link")

    # Sitemap should include both latest URLs and weekly keywords pages
    expect_contains(errors, "sitemap.xml", f"{public_base}/blog_posts/weekly-money-zodiac-{week_slug}.html", "KO money sitemap URL")
    expect_contains(errors, "sitemap.xml", f"{public_base}/blog_posts/weekly-money-zodiac-{week_slug}-en.html", "EN money sitemap URL")
    expect_contains(errors, "sitemap.xml", f"{public_base}/blog_posts/weekly-keywords.html", "KO keywords sitemap URL")
    expect_contains(errors, "sitemap.xml", f"{public_base}/blog_posts/weekly-keywords-en.html", "EN keywords sitemap URL")

    # Optional updated date check
    if args.date_modified:
        expected = args.date_modified
        for rel_path in [
            "blog_posts/weekly-keywords.html",
            "blog_posts/weekly-keywords-en.html",
            money_ko,
            money_en,
            "blog_posts/money-zodiac.html",
            "blog_posts/money-zodiac-en.html",
            "blog_posts/weekly-money-zodiac.html",
            "blog_posts/weekly-money-zodiac-en.html",
            "sitemap.xml",
        ]:
            expect_contains(errors, rel_path, expected, "expected modified date")

    if errors:
        print("Weekly content check failed.")
        for err in errors:
            print(f"ERROR: {err}")
        return 1

    print("Weekly content check passed.")
    print(f"- week slug: {week_slug}")
    print(f"- KO range: {ko_range}")
    print(f"- EN range: {en_range}")
    if args.date_modified:
        print(f"- expected modified date: {args.date_modified}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
