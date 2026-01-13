'use client';
import { useEffect, Fragment, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import AnimateHeight from 'react-animate-height';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconMinus from '@/components/icon/icon-minus';
import { TUser } from '@/types';
import IconUser from '../icon/icon-user';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = getTranslation();
  const pathname = usePathname();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const userSession = useSelector((state: IRootState) => state.auth);
  const userDetails: TUser = userSession?.user!;

  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark,
  );
  const [currentMenu, setCurrentMenu] = useState<string>('');

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue: string) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]',
    );
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any =
          ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll('.sidebar ul a.active');
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove('active');
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]',
    );
    selector?.classList.add('active');
  };

  const menuItems = [
    {
      name: t('Users'),
      Icon: <IconUser />,
      route: '/users',
      items: [],
      heading: '',
    },

    {
      name: t('Master'),
      Icon: <IconUser />,
      heading: '',
      items: [
        {
          name: t('Block Master'),
          route: '/block-master',
          Icon: <IconUser />,
        },
        {
          name: t('Colony Master'),
          route: '/colony-master',
          Icon: <IconUser />,
        },
      ],
    },

    {
      name: t('GIS Survey'),
      Icon: <IconUser />,
      route: '/survey',
      items: [],
      heading: '',
    },

    {
      name: t('GIS Reports'),
      Icon: <IconUser />,
      route: '/pmidc-reports',
      items: [],
      heading: '',
    },
  ];

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed(prevState => !prevState);
    dispatch(toggleSidebar());
  };


  useEffect(() => {
    if (isCollapsed) {
      setCurrentMenu('');
    }
  }, [isCollapsed]);

    return (
    <div className={semidark ? 'dark' : ''}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? 'text-white-dark' : ''
        }`}>
        <div className="h-full bg-gray-800/95 dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3 bg-cyan-700">
            <img
              className="ml-[5px] h-10 w-10 flex-none"
              src="/zabware_logo.png"
              alt="zabware"
            />

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-200 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
              onClick={handleToggleSidebar}>
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className='relative space-y-1 p-3 py-0 font-semibold mt-0'>
              {menuItems?.map(menuItem => {
                if (menuItem.name === 'Spacer') {
                  return <li key={menuItem.name} className="spacer"></li>;
                } else if (!menuItem.items?.length && menuItem.route) {
                  return (
                    <Fragment key={menuItem.route}>
                      {menuItem?.heading && (
                        <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                          <IconMinus className="hidden h-5 w-4 flex-none pl-5" />
                          <span>{menuItem?.heading}</span>
                        </h2>
                      )}

                      <li className="nav-item" key={menuItem.name}>
                        <Link href={menuItem.route} className="group">
                          <div className="flex items-center text-white">
                            {menuItem.Icon && menuItem.Icon}
                            <span
                              className={`dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 ${
                                isCollapsed ? 'hidden' : ''
                              }`}>
                              {menuItem.name}
                            </span>
                          </div>
                        </Link>
                      </li>
                    </Fragment>
                  );
                } else {
                  return (
                    <li className="menu nav-item" key={menuItem.name}>
                      <button
                        type="button"
                        className={`nav-link group flex w-full items-center justify-between ${
                          currentMenu === menuItem.name
                            ? 'bg-gray-700 dark:bg-dark-light/30'
                            : ''
                        }`}
                        onClick={() => toggleMenu(menuItem.name)}>
                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-3">
                          {menuItem.Icon}
                          <span
                            className={`text-white dark:text-[#506690] dark:group-hover:text-white-dark ${
                              isCollapsed ? 'hidden' : ''
                            }`}>
                            {menuItem.name}
                          </span>
                        </div>

                        {/* RIGHT SIDE ARROW (only rotates) */}
                        <IconCaretDown
                          className={`transition-transform duration-300 ${
                            currentMenu === menuItem.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* SUB MENU */}
                      <AnimateHeight
                        duration={300}
                        height={currentMenu === menuItem.name ? 'auto' : 0}>
                        <ul className="sub-menu space-y-1 pl-10 list-none">
                          {menuItem.items.map(subItem => (
                            <li key={subItem.route}>
                              <Link
                                href={subItem.route}
                                className="group flex items-center gap-3 rounded px-3 py-2 text-sm text-white transition hover:bg-gray-700 dark:text-[#506690] dark:hover:bg-dark-light">
                                {/* SUB ICON */}
                                {/* {subItem.Icon && (
                                  <span className="text-gray-500 group-hover:text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                    {subItem.Icon}
                                  </span>
                                )} */}

                                {/* SUB TEXT */}
                                <span className="whitespace-nowrap">
                                  {subItem.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AnimateHeight>
                    </li>
                  );
                }
              })}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

// 'use client';
// import { useEffect, Fragment, useState } from 'react';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import { useDispatch, useSelector } from 'react-redux';
// import Link from 'next/link';
// import { toggleSidebar } from '@/store/themeConfigSlice';
// import { IRootState } from '@/store';
// import IconCaretsDown from '@/components/icon/icon-carets-down';
// import { usePathname } from 'next/navigation';
// import { getTranslation } from '@/i18n';
// import AnimateHeight from 'react-animate-height';
// import IconCaretDown from '@/components/icon/icon-caret-down';
// import IconMinus from '@/components/icon/icon-minus';
// import { TUser } from '@/types';
// import IconUser from '../icon/icon-user';

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const { t } = getTranslation();
//   const pathname = usePathname();
//   const themeConfig = useSelector((state: IRootState) => state.themeConfig);
//   const userSession = useSelector((state: IRootState) => state.auth);
//   const userDetails: TUser = userSession?.user!;

//   const semidark = useSelector(
//     (state: IRootState) => state.themeConfig.semidark,
//   );
//   const [currentMenu, setCurrentMenu] = useState<string>('');

//   const toggleMenu = (value: string) => {
//     setCurrentMenu((oldValue: string) => {
//       return oldValue === value ? '' : value;
//     });
//   };

//   useEffect(() => {
//     const selector = document.querySelector(
//       '.sidebar ul a[href="' + window.location.pathname + '"]',
//     );
//     if (selector) {
//       selector.classList.add('active');
//       const ul: any = selector.closest('ul.sub-menu');
//       if (ul) {
//         let ele: any =
//           ul.closest('li.menu').querySelectorAll('.nav-link') || [];
//         if (ele.length) {
//           ele = ele[0];
//           setTimeout(() => {
//             ele.click();
//           });
//         }
//       }
//     }
//   }, []);

//   useEffect(() => {
//     setActiveRoute();
//     if (window.innerWidth < 1024 && themeConfig.sidebar) {
//       dispatch(toggleSidebar());
//     }
//   }, [pathname]);

//   const setActiveRoute = () => {
//     let allLinks = document.querySelectorAll('.sidebar ul a.active');
//     for (let i = 0; i < allLinks.length; i++) {
//       const element = allLinks[i];
//       element?.classList.remove('active');
//     }
//     const selector = document.querySelector(
//       '.sidebar ul a[href="' + window.location.pathname + '"]',
//     );
//     selector?.classList.add('active');
//   };

//   const menuItems = [
//     {
//       name: t('Users'),
//       Icon: <IconUser />,
//       route: '/users',
//       items: [],
//       heading: '',
//     },

//     {
//       name: t('Master'),
//       Icon: <IconUser />,
//       heading: '',
//       items: [
//         {
//           name: t('Block Master'),
//           route: '/block-master',
//           Icon: <IconUser />,
//         },
//         {
//           name: t('Colony Master'),
//           route: '/colony-master',
//           Icon: <IconUser />,
//         },
//       ],
//     },

//     {
//       name: t('GIS Survey'),
//       Icon: <IconUser />,
//       route: '/survey',
//       items: [],
//       heading: '',
//     },
//   ];

//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const handleToggleSidebar = () => {
//     setIsCollapsed(prevState => !prevState);
//     dispatch(toggleSidebar());
//   };

//   return (
//     <div className={semidark ? 'dark' : ''}>
//       <nav
//         className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
//           semidark ? 'text-white-dark' : ''
//         }`}>
//         <div className="h-full bg-gray-800/95 dark:bg-black">
//           <div className="flex items-center justify-between px-4 py-3 bg-cyan-700">
//             <img
//               className="ml-[5px] h-10 w-10 flex-none"
//               src="/zabware_logo.png"
//               alt="zabware"
//             />

//             <button
//               type="button"
//               className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-200 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
//               onClick={handleToggleSidebar}>
//               <IconCaretsDown className="m-auto rotate-90" />
//             </button>
//           </div>
//           <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
//             <ul className='relative space-y-1 p-3 py-0 font-semibold mt-0'>
//               {menuItems?.map(menuItem => {
//                 if (menuItem.name === 'Spacer') {
//                   return <li key={menuItem.name} className="spacer"></li>;
//                 } else if (!menuItem.items?.length && menuItem.route) {
//                   return (
//                     <Fragment key={menuItem.route}>
//                       {menuItem?.heading && (
//                         <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
//                           <IconMinus className="hidden h-5 w-4 flex-none pl-5" />
//                           <span>{menuItem?.heading}</span>
//                         </h2>
//                       )}

//                       <li className="nav-item" key={menuItem.name}>
//                         <Link href={menuItem.route} className="group">
//                           <div className="flex items-center text-white">
//                             {menuItem.Icon && menuItem.Icon}
//                             <span
//                               className={`dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 ${
//                                 isCollapsed ? 'hidden' : ''
//                               }`}>
//                               {menuItem.name}
//                             </span>
//                           </div>
//                         </Link>
//                       </li>
//                     </Fragment>
//                   );
//                 } else {
//                   return (
//                     <li className="menu nav-item" key={menuItem.name}>
//                       <button
//                         type="button"
//                         className={`nav-link group flex w-full items-center justify-between ${
//                           currentMenu === menuItem.name
//                             ? 'bg-gray-700 dark:bg-dark-light/30'
//                             : ''
//                         }`}
//                         onClick={() => toggleMenu(menuItem.name)}>
//                         {/* LEFT SIDE */}
//                         <div className="flex items-center gap-3">
//                           {menuItem.Icon}
//                           <span
//                             className={`text-white dark:text-[#506690] dark:group-hover:text-white-dark ${
//                               isCollapsed ? 'hidden' : ''
//                             }`}>
//                             {menuItem.name}
//                           </span>
//                         </div>

//                         {/* RIGHT SIDE ARROW (only rotates) */}
//                         <IconCaretDown
//                           className={`transition-transform duration-300 ${
//                             currentMenu === menuItem.name ? 'rotate-180' : ''
//                           }`}
//                         />
//                       </button>

//                       {/* SUB MENU */}
//                       <AnimateHeight
//                         duration={300}
//                         height={currentMenu === menuItem.name ? 'auto' : 0}>
//                         <ul className="sub-menu space-y-1 pl-10 list-none">
//                           {menuItem.items.map(subItem => (
//                             <li key={subItem.route}>
//                               <Link
//                                 href={subItem.route}
//                                 className="group flex items-center gap-3 rounded px-3 py-2 text-sm text-white transition hover:bg-gray-700 dark:text-[#506690] dark:hover:bg-dark-light">
//                                 {/* SUB ICON */}
//                                 {/* {subItem.Icon && (
//                                   <span className="text-gray-500 group-hover:text-black dark:text-[#506690] dark:group-hover:text-white-dark">
//                                     {subItem.Icon}
//                                   </span>
//                                 )} */}

//                                 {/* SUB TEXT */}
//                                 <span className="whitespace-nowrap">
//                                   {subItem.name}
//                                 </span>
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </AnimateHeight>
//                     </li>
//                   );
//                 }
//               })}
//             </ul>
//           </PerfectScrollbar>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
