import './MenuItem.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { useRipple } from '@/hooks/useRipple';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

export type MenuItemProps<T extends AsType = 'li'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    dense?: boolean;
    disabled?: boolean;
    selected?: boolean;
    href?: string;
    focus?: boolean;
  };

const MenuItem = <T extends AsType = 'li'>(props: MenuItemProps<T>) => {
  const {
    children,
    dense = false,
    disabled = false,
    selected = false,
    href,
    focus = false,
    className,
    style,
    as: Component = href ? 'a' : 'li',
    ...rest
  } = props;
  const newStyle = useStyle(style);
  const { rippleTargetRef, RippleContainer } = useRipple({
    rippleColor: 'black'
  });

  return (
    <Component
      ref={rippleTargetRef}
      className={cn(
        'JinniMenuItem',
        { dense },
        { disabled },
        { selected },
        { focus },
        className
      )}
      style={newStyle}
      href={href}
      {...rest}
    >
      {children}
      <RippleContainer />
    </Component>
  );
};

export default MenuItem;