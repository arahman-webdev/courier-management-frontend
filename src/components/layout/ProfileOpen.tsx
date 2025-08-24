import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  type Side,
  type Align,
} from '@/components/animate-ui/base/popover';
 

interface ProfileOpenProps extends BasePopoverDemoProps {
  name?: string;
  img?: string;
  MyDashboard?: string;
  logout: () => void;
}

interface BasePopoverDemoProps {
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
  openOnHover?: boolean;
  delay?: number;
  closeDelay?: number;
}
 
export const ProfileOPen = ({
  side,
  sideOffset,
  align,
  alignOffset,
  openOnHover,
  delay,
  closeDelay,
  name,
  img,
  MyDashboard,
  logout,
}: ProfileOpenProps) => {
  return (
    <Popover openOnHover={openOnHover} delay={delay} closeDelay={closeDelay}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
            {img && <img src={img} alt={name} className="w-6 h-6 rounded-full" />}
            <span>{name ?? "Profile"}</span>
          </Button>
        }
      />
      <PopoverContent
        className="w-56 p-3"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 border-b pb-2">
            {img && <img src={img} alt={name} className="w-10 h-10 rounded-full" />}
            <span className="font-medium">{name}</span>
          </div>

          <a href={MyDashboard} className="text-sm hover:underline">
            My Dashboard
          </a>

          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
