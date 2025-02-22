import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var ScrollReveal: any;
declare var Swiper: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollReveal();
      this.initSwiper();
      this.initMenuToggle();
      this.duplicateInstagramImages();
    }
  }

  initMenuToggle(): void {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn?.querySelector("i");

    menuBtn?.addEventListener("click", () => {
      navLinks?.classList.toggle("open");
      const isOpen = navLinks?.classList.contains("open");
      if (menuBtnIcon) menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    navLinks?.addEventListener("click", () => {
      navLinks.classList.remove("open");
      if (menuBtnIcon) menuBtnIcon.setAttribute("class", "ri-menu-line");
    });
  }

  initScrollReveal(): void {
    if (typeof window !== 'undefined' && ScrollReveal) {
      const scrollRevealOption = {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
      };

      ScrollReveal().reveal(".about__container .section__header", scrollRevealOption);
      ScrollReveal().reveal(".about__container .section__description", { ...scrollRevealOption, delay: 500, interval: 500 });
      ScrollReveal().reveal(".about__container img", { ...scrollRevealOption, delay: 1500 });
      ScrollReveal().reveal(".service__container .section__header", scrollRevealOption);
      ScrollReveal().reveal(".service__container .section__description", { ...scrollRevealOption, delay: 500 });
      ScrollReveal().reveal(".service__card", { duration: 1000, delay: 1000, interval: 500 });
      ScrollReveal().reveal(".blog__content .section__header", scrollRevealOption);
      ScrollReveal().reveal(".blog__content h4", { ...scrollRevealOption, delay: 500 });
      ScrollReveal().reveal(".blog__content p", { ...scrollRevealOption, delay: 1000 });
      ScrollReveal().reveal(".blog__content .blog__btn", { ...scrollRevealOption, delay: 1500 });
    }
  }

  initSwiper(): void {
    if (typeof window !== 'undefined' && Swiper) {
      new Swiper(".swiper", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
      });
    }
  }

  duplicateInstagramImages(): void {
    if (typeof window !== 'undefined') {
      const instagram = document.querySelector(".instagram__flex");
      if (instagram) {
        Array.from(instagram.children).forEach((item) => {
          const duplicateNode = item.cloneNode(true) as HTMLElement;
          duplicateNode.setAttribute("aria-hidden", "true");
          instagram.appendChild(duplicateNode);
        });
      }
    }
  }
}
