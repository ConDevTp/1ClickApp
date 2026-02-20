import React from "react";
import ButtonGroup from "../../Components/UI/ButtonGroup";
import CompactSlider from "../../Components/UI/CompactSlider";
import CustomColorPicker from "../../Components/UI/ColorPicker";

const GradientBg = ({ defaultGradColor1, defaultGradColor2, gradAngle, setGradAngle, handleGradientChange, isRadial }) => {
  return (
    <div>
      <ButtonGroup 
        options={[
          { label: 'خطی', value: 'linear' },
          { label: 'دایره‌ای', value: 'radial' }
        ]}
        activeValue={isRadial ? 'radial' : 'linear'}
        onChange={(val) => handleGradientChange(defaultGradColor1, defaultGradColor2, gradAngle, val)}
      />
      
      <div className="ui-grid-2">
        <CustomColorPicker 
          label="رنگ اول"
          value={defaultGradColor1} 
          onChange={(c) => handleGradientChange(c, defaultGradColor2, gradAngle, isRadial ? "radial" : "linear")} 
        />
        <CustomColorPicker 
          label="رنگ دوم"
          value={defaultGradColor2} 
          onChange={(c) => handleGradientChange(defaultGradColor1, c, gradAngle, isRadial ? "radial" : "linear")} 
        />
      </div>
      
      {!isRadial && (
        <CompactSlider
          label="زاویه"
          min={0}
          max={360}
          value={gradAngle}
          onChange={(val) => {
            setGradAngle(val);
            handleGradientChange(defaultGradColor1, defaultGradColor2, val, "linear");
          }}
          unit="°"
        />
      )}
    </div>
  );
};

export default GradientBg;