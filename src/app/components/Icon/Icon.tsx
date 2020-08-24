import styled from "@emotion/styled";
import { css } from "@emotion/core";

/**
 *  Style Related Typings
 */
type CssSize = string | number; // e.g. 10px, 2em, 100%. Plain numbers are px
type Size = { width: CssSize; height: CssSize };

export interface IProps {
  src: string;
  size?: CssSize | Size;
}

const iconSize = ({ size = "1em" }: IProps) =>
  typeof size === "object"
    ? size
    : css({
        height: size,
        width: size,
      });

export const Icon = styled.i<IProps>(
  {
    display: "inline-block",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    fontFamily: `'Roboto', --apple-system, blinkmacsystemfont, 'Segoe UI',
    helvetica, aria, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol'`,
    verticalAlign: "middle",
  },
  (props) => ({ backgroundImage: `url(${props.src})` }),
  iconSize
);