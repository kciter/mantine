import React from 'react';
import {
  ActionIcon,
  UnstyledButton,
  SelectChevronIcon,
  MantineSize,
  ClassNames,
  DefaultProps,
} from '@mantine/core';
import { ArrowIcon } from './ArrowIcon';
import useStyles from './CalendarHeader.styles';

export type CalendarHeaderStylesNames = ClassNames<typeof useStyles>;

interface CalendarHeaderProps
  extends DefaultProps<CalendarHeaderStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
  hasPrevious: boolean;
  hasNext: boolean;
  onNext?(): void;
  onPrevious?(): void;
  onNextLevel?(): void;
  label?: string;
  nextLevelDisabled?: boolean;
  size?: MantineSize;
  __staticSelector?: string;
  nextLabel?: string;
  previousLabel?: string;
  preventLevelFocus?: boolean;
}

const iconSizes = {
  xs: 12,
  sm: 14,
  md: 18,
  lg: 22,
  xl: 28,
};

export function CalendarHeader({
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
  onNextLevel,
  className,
  label,
  nextLevelDisabled,
  size,
  classNames,
  styles,
  __staticSelector = 'CalendarHeader',
  nextLabel,
  previousLabel,
  preventLevelFocus = false,
  ...others
}: CalendarHeaderProps) {
  const { classes, cx, theme } = useStyles(
    { size },
    { classNames, styles, name: __staticSelector }
  );

  const iconSize = theme.fn.size({ size, sizes: iconSizes });

  return (
    <div className={cx(classes.calendarHeader, className)} {...others}>
      <ActionIcon
        className={classes.calendarHeaderControl}
        disabled={!hasPrevious}
        onClick={onPrevious}
        aria-label={previousLabel}
      >
        <ArrowIcon direction="left" width={iconSize} height={iconSize} />
      </ActionIcon>

      <UnstyledButton
        className={classes.calendarHeaderLevel}
        disabled={nextLevelDisabled}
        onClick={onNextLevel}
        tabIndex={preventLevelFocus ? -1 : 0}
      >
        <div>{label}</div>
        {!nextLevelDisabled && (
          <SelectChevronIcon
            error={false}
            size={size}
            className={classes.calendarHeaderLevelIcon}
          />
        )}
      </UnstyledButton>

      <ActionIcon
        className={classes.calendarHeaderControl}
        disabled={!hasNext}
        onClick={onNext}
        aria-label={nextLabel}
      >
        <ArrowIcon direction="right" width={iconSize} height={iconSize} />
      </ActionIcon>
    </div>
  );
}

CalendarHeader.displayName = '@mantine/dates/CalendarHeader';
