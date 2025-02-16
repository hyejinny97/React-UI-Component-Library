import './CircularProgress.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { ColorType } from '@/types/color';
import { isNumber } from '@/utils/isNumber';
import { getComputedSize } from './CircularProgress.utils';
import Progress from './Progress';
import Trail from './Trail';
import Label from './Label';

export type SizeKeyword = 'sm' | 'md' | 'lg';
export type SizeType = SizeKeyword | number;
export type LineCapType = 'butt' | 'round';

export type CircularProgressProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    percent?: number;
    thickness?: number;
    progressColor?: ColorType;
    trailColor?: ColorType;
    size?: SizeType;
    lineCap?: LineCapType;
    disableShrink?: boolean;
    speed?: number;
    showLabel?: boolean;
    labelFormat?: (percent: number) => string;
  };

const LIMIT_SIZE = 40;

const CircularProgress = <T extends AsType = 'div'>(
  props: CircularProgressProps<T>
) => {
  const {
    percent,
    thickness = 4,
    progressColor = 'primary',
    trailColor = 'transparent',
    size = 'md',
    lineCap = 'round',
    disableShrink = false,
    speed = 1.5,
    showLabel = false,
    labelFormat = (percent) => `${percent}%`,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const computedSize = getComputedSize(size);
  const sizeStyle = { width: computedSize, height: computedSize };
  const fontSizeStyle = { fontSize: computedSize * 0.25 };
  const newStyle = useStyle({ ...sizeStyle, ...fontSizeStyle, ...style });
  const isDeterminate = isNumber(percent);
  const isMoreThanLimitSize = computedSize >= LIMIT_SIZE;

  return (
    <Component
      className={cn(
        'JinniCircularProgress',
        isDeterminate ? 'determinate' : 'indeterminate',
        { disableShrink },
        className
      )}
      style={newStyle}
      {...rest}
    >
      <Trail thickness={thickness} trailColor={trailColor} />
      <Progress
        percent={percent}
        thickness={thickness}
        progressColor={progressColor}
        lineCap={lineCap}
        speed={speed}
      />
      {isDeterminate && showLabel && isMoreThanLimitSize && (
        <Label value={labelFormat(percent)} />
      )}
    </Component>
  );
};

export default CircularProgress;
