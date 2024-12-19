
import '../../public/template/css/sb-admin-2.min.css';
import '../../public/template/css/fontawesome-free/css/all.min.css';

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
        <script src="/template/js/jquery.min.js"></script>
        <script src="/template/js/bootstrap.bundle.min.js"></script>
        <script src="/template/js/sb-admin-2.min.js"></script>
      </body>
    </html>
  );
}
