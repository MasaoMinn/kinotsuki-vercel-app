"use client";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTheme } from "@/components/boxed/ThemeProvider";
import { useTranslation } from "react-i18next";
import i18n from "@/app/i18n";
import { useLocalStorageStore } from "@/store/LocalStorageStore";

function BasicExample() {
  const { theme, toggleTheme, currentTheme, nextTheme, prevTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg={theme}
      data-bs-theme={theme}
    >
      <Container>
        <Navbar.Brand href="/">{t("mainpage.title")}</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="overflow-visible" // ✅ 防止 dropdown 被裁切
        >
          <Nav className="me-auto" />

          <Nav>
            {/* ========= 语言切换 ========= */}
            <NavDropdown
              title={t("lang")}
              id="lang"
              autoClose="outside" // ✅ 移动端必加
            >
              <NavDropdown.Item
                onClick={() => {
                  i18n.changeLanguage("en");
                  useLocalStorageStore
                    .getState()
                    .setLanguageCookie("en");
                }}
              >
                English
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => {
                  i18n.changeLanguage("zh");
                  useLocalStorageStore
                    .getState()
                    .setLanguageCookie("zh");
                }}
              >
                简体中文
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => {
                  i18n.changeLanguage("jp");
                  useLocalStorageStore
                    .getState()
                    .setLanguageCookie("jp");
                }}
              >
                日本語
              </NavDropdown.Item>
            </NavDropdown>

            {/* ========= 主题切换 ========= */}
            <NavDropdown
              title={t("mainpage.dropdown")}
              id="theme-dropdown"
              autoClose={true} // ✅ 关键：内部交互不自动关闭
            >
              {/* ❗ 用 div，不要用 NavDropdown.Item */}
              <div
                className="px-3 py-2"
                onClick={(e) => e.stopPropagation()} // ✅ 阻止冒泡
              >
                <div className="d-flex gap-2 mb-2">
                  <Button
                    onClick={prevTheme}
                    variant={theme}
                    className="flex-fill"
                  >
                    ⏮️
                  </Button>

                  <Button
                    onClick={toggleTheme}
                    variant={theme}
                    className="flex-fill"
                  >
                    {t("mainpage.theme")}{" "}
                    {theme === "light" ? "🌙" : "☀️"}
                  </Button>

                  <Button
                    onClick={nextTheme}
                    variant={theme}
                    className="flex-fill"
                  >
                    ⏭️
                  </Button>
                </div>

                <div className="text-center small opacity-75">
                  {t("mainpage.theme_variant")} {currentTheme + 1}
                </div>
              </div>

              <NavDropdown.Divider />

              <NavDropdown.Item href="./About">
                {t("mainpage.about")}
              </NavDropdown.Item>

              <NavDropdown.Item
                href="https://github.com/MasaoMinn/MasaoMinn.github.io"
                target="_blank"
              >
                {t("mainpage.seeme")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
