import React, { Fragment } from "react"
import Wheel from "@uiw/react-color-wheel"
import { HsvaColor, hsvaToHex } from "@uiw/color-convert"

export const ColorPicker =({hsva, setHsva} : {hsva:HsvaColor, setHsva:React.Dispatch<React.SetStateAction<HsvaColor>>}): JSX.Element => {
    return (
        <Fragment>
            <Wheel color={hsva} onChange={(color) => setHsva({ ...hsva, ...color.hsva })} />
            <div style={{ width: "100%", height: 34, marginTop: 20, background: hsvaToHex(hsva) }}></div>
        </Fragment>
    )
}
