import React from 'react';

type IconName =
    | 'icon-car'
    | 'icon-gearbox'
    | 'icon-map'
    | 'icon-petrol'
    | 'icon-star'
    | 'icon-euro'
    | 'icon-radio-btn-check'
    | 'icon-radio-btn-empty'
    | 'icon-travel-trucks';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    sizeWidth?: number;
    sizeHeight?: number;
}

export const Icon: React.FC<IconProps> = ({
    name,
    sizeWidth = 20,
    sizeHeight = sizeWidth,
    className,
    ...props
}) => {
    return (
        <svg
            width={sizeWidth}
            height={sizeHeight}
            className={className}
            aria-hidden="true"
            {...props}
        >
            <use href={`/sprite.svg#${name}`} />
        </svg>
    );
};
