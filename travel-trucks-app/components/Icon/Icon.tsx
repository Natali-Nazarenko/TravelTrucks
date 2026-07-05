import React from 'react';

type IconName =
    | 'icon-car'
    | 'icon-gearbox'
    | 'icon-map'
    | 'icon-petrol'
    | 'icon-star'
    | 'icon-euro';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className, ...props }) => {
    return (
        <svg width={size} height={size} className={className} aria-hidden="true" {...props}>
            <use href={`/sprite.svg#${name}`} />
        </svg>
    );
};
