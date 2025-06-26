interface NavLink {
  title: string;
  href: string;
  thumbnail: string;
}

const links: NavLink[] = [
  {
    title: 'Home',
    href: '/#hero',
    thumbnail: '/assets/nav-link-previews/landing.png'
  },
  {
    title: 'Skills',
    href: '/#skills',
    thumbnail: '/assets/nav-link-previews/skills.png'
  },
  {
    title: 'Projects',
    href: '/#projects',
    thumbnail: '/assets/nav-link-previews/projects.png'
  },
];

export { links, type NavLink };
