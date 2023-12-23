import { ReactNode } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const MenuStyle = ({ title }: { title: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={`mr-5 cursor-pointer  ${
        pathname.includes(title) && "font-black	"
      }`}
      onClick={() => router.push(`/assignment${title}`)}
    >
      Assignment {title}
    </div>
  );
};
const LayoutContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex w-[100vw] justify-center">
        <MenuStyle title="1" />
        <MenuStyle title="2" />
      </div>
      <div className="flex justify-center mt-5">{children}</div>
    </div>
  );
};
export default LayoutContainer;
