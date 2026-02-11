import os
import pytest
from playwright.sync_api import sync_playwright

PAGES = ["index.html", "events.html", "structure.html", "gallery.html"]

@pytest.fixture(scope="module")
def browser_context():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        yield context
        browser.close()

@pytest.mark.parametrize("page_name", PAGES)
def test_page_loads_and_has_header(browser_context, page_name):
    page = browser_context.new_page()
    filepath = os.path.abspath(page_name)
    page.goto(f"file://{filepath}")

    # Check if main heading exists
    # Index has h1 in hero, others have h1 in page-header
    h1 = page.locator("h1")
    assert h1.count() > 0
    assert h1.first.is_visible()

    # Check if navigation exists
    nav = page.locator("nav")
    assert nav.count() > 0
    assert nav.is_visible()

    # Check for ALgo42 logo
    logo = page.locator(".nav-logo")
    assert logo.count() > 0
    assert "ALgo42" in logo.text_content()

    page.close()

def test_navigation_is_consistent(browser_context):
    page = browser_context.new_page()
    filepath = os.path.abspath("index.html")
    page.goto(f"file://{filepath}")

    links = page.locator("nav ul li a")
    link_count = links.count()
    assert link_count == 4

    texts = [links.nth(i).text_content().strip() for i in range(link_count)]
    assert "Home" in texts
    assert "Structure & Team" in texts
    assert "Events" in texts
    assert "Gallery" in texts

    page.close()
