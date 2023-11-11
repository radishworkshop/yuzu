import { ContentConfig } from '@/types/nav'

export const docsConfig: ContentConfig = {
  mainNav: [],
  sidebarNav: [{
    title: "Getting Started",
    items: [{
      title: "Welcome to Yuzu",
      href: "/docs/welcome-to-the-yuzu-docs",
      items: [],
    }, {
      title: "Features Overview",
      href: "/docs/features-overview",
      items: [],
    }, {
      title: "The Yuzu Method",
      href: "/docs/the-yuzu-method",
      items: [],
    }],
  }, {
    title: "Translation Workflow",
    items: [{
      title: "npx yuzu init",
      href: "/docs/translation-workflow/yuzu-init",
      items: [],
    }, {
      title: "npx yuzu build",
      href: "/docs/translation-workflow/yuzu-build",
      items: [],
    }, {
      title: "npx yuzu push",
      href: "/docs/translation-workflow/yuzu-push",
      items: [],
    }, {
      title: "npx yuzu translate",
      href: "/docs/translation-workflow/yuzu-translate",
      items: [],
    }, {
      title: "npx yuzu pull",
      href: "/docs/translation-workflow/yuzu-pull",
      items: [],
    }]
  }, {
    title: "Integration Guides",
    items: [{
      title: "NextJS",
      href: "/docs/integration-guides/nextjs",
      items: [],
    }, {
      title: "React",
      href: "/docs/integration-guides/react",
      items: [],
    }, {
      title: "Coming Soon",
      href: "/docs/integration-guides/roadmap",
      items: [],
    }],
  }, {
    title: "React Components",
    items: [{
      title: "<LanguageSwitcher />",
      href: "/docs/react-components/language-switcher",
      items: [],
    }]
  }, {
    title: "More Resources",
    items: [{
      title: "Advanced features",
      href: "/docs/more-resources/advanced-features",
      items: [],
    }, {
      title: "Software shoutouts",
      href: "/docs/more-resources/software-shoutouts",
      items: [],
    }, {
      title: "Self-hosting",
      href: "/docs/more-resources/self-hosting",
      items: [],
    }, {
      title: "Feedback",
      href: "/docs/more-resources/feedback",
      items: [],
    }],
  }],
}