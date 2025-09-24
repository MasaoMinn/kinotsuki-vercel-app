// "use client";
// import React from 'react';
// import Toast from 'react-bootstrap/Toast';
// import { ToastContainer } from 'react-bootstrap';
// import { useModalStore } from '@/app/store/ModalStore';
// import { useTranslation } from 'react-i18next';
// import type { ToastProps } from 'react-bootstrap';

// type AlertType = 'severe' | 'warning' | 'reminder' | 'info' | 'success';

// type AlertToastProps = ToastProps & {
//   type: AlertType;
//   title: string;
//   message: string;
// }

// export const AlertToast = ({ type, title, message }: AlertToastProps) => {
//   const { hideModal, openModal } = useModalStore();
//   const isShow = openModal === type;

//   return (
//     <ToastContainer className="p-3" position='top-center' style={{ zIndex: 1 }}>
//       <Toast
//         show={isShow}
//         onClose={() => hideModal()}
//         delay={2500}
//         autohide
//       >
//         <Toast.Header>
//           <strong className="me-auto">{title}</strong>
//           <small>{new Date().toLocaleTimeString()}</small>
//         </Toast.Header>
//         <Toast.Body>{message}</Toast.Body>
//       </Toast>
//     </ToastContainer>
//   );
// };

// export const AlertAvatar = () => {
//   const { t } = useTranslation();
//   return (
//     <AlertToast
//       type="alert_avatar"
//       title={t('upd_avatar')}
//       message={t('upd_avatar_message')}
//       bg='success'
//     />
//   )
// };

// export const AlertLoginSuccess = () => {
//   const { t } = useTranslation();
//   return (
//     <AlertToast
//       type="alert_login_success"
//       title={t('login') + t('success')}
//       message={t('login_success_message')}
//       bg='success'
//     />
//   )
// };

// export const AlertLogout = () => {
//   const { t } = useTranslation();
//   return (
//     <AlertToast
//       type="alert_logout"
//       title={t('logout') + t('success')}
//       message={t('logout_success_message')}
//       bg='success'
//     />
//   )
// }

// export const AlertError = ({ title, message }: { title: string, message: string }) => {
//   const { t } = useTranslation();
//   return (
//     <AlertToast
//       type="alert_logout"
//       title={title}
//       message={message}
//       bg='danger'
//     />
//   )
// }