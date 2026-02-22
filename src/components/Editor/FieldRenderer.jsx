import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { SchemaRegistry } from "../../schemas";
import { useStore } from "../../store/useStore";
import { getNestedValue } from "../../utils/resolver";

export const FieldRenderer = ({ field, sectionId, basePath = "" }) => {
  const fullPath = basePath
    ? `${basePath}.${field.path}`.replace(/\.+/g, ".")
    : field.path;
  const update = useStore((s) => s.updateOverride);
  const deleteOverride = useStore((s) => s.deleteOverride);

  const getDefaultValue = (schema, path) => {
    if (path.includes(".byId.")) {
      const match = path.match(/(.*)\.byId\.([^.]+)\.(.*)/);
      if (match) {
        const listPath = match[1];
        const itemId = match[2];
        const restPath = match[3];
        const defaultList = getNestedValue(schema?.defaults, listPath);

        if (Array.isArray(defaultList) && defaultList.length > 0) {
          const defaultItem = defaultList.find((i) => i.id === itemId);

          if (defaultItem) {
            return getNestedValue(defaultItem, restPath);
          } else {
            const template = defaultList[0];
            if (restPath === "content.text") return "آیتم جدید";
            return getNestedValue(template, restPath);
          }
        }
      }
      return undefined;
    }
    return getNestedValue(schema?.defaults, path);
  };

  const hasOverride = useStore((s) => {
    const overrides = s.sections[sectionId]?.overrides;
    if (!overrides) return false;

    const overrideVal = getNestedValue(overrides, fullPath);
    if (overrideVal === undefined) return false;

    const schema = SchemaRegistry[s.sections[sectionId]?.type];
    const defaultVal = getDefaultValue(schema, fullPath);

    return JSON.stringify(overrideVal) !== JSON.stringify(defaultVal);
  }, shallow);

  const globalValue = useStore((s) => {
    const sec = s.sections[sectionId];
    if (!sec) return "";

    const overrideVal = getNestedValue(sec.overrides, fullPath);
    if (overrideVal !== undefined) return overrideVal;

    const schema = SchemaRegistry[sec.type];
    const defaultVal = getDefaultValue(schema, fullPath);

    return defaultVal !== undefined ? defaultVal : "";
  });

  const [localValue, setLocalValue] = useState(globalValue);

  useEffect(() => {
    setLocalValue(globalValue);
  }, [globalValue]);

  useEffect(() => {
    if (localValue === globalValue) return;
    const timeoutId = setTimeout(() => {
      update(sectionId, fullPath, localValue);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [localValue, sectionId, fullPath, update, globalValue]);

  const handleChange = (e) => setLocalValue(e.target.value);
  const handleSliderChange = (e, newValue) =>
    setLocalValue(`${newValue}${field.unit || "px"}`);
  const handleAlignmentChange = (e, newAlignment) => {
    if (newAlignment !== null) setLocalValue(newAlignment);
  };
  const handleSwitchChange = (e) => setLocalValue(e.target.checked);

  const handleReset = () => {
    deleteOverride(sectionId, fullPath);
    const schema =
      SchemaRegistry[useStore.getState().sections[sectionId]?.type];
    const defVal = getDefaultValue(schema, fullPath);
    setLocalValue(defVal !== undefined ? defVal : "");
  };

  const renderLabel = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 0.5,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {field.label}
      </Typography>
      {hasOverride && (
        <IconButton
          size="small"
          onClick={handleReset}
          sx={{ p: 0.2, color: "warning.main" }}
          title="بازگشت به پیش‌فرض"
        >
          <RestartAltIcon sx={{ fontSize: "14px" }} />
        </IconButton>
      )}
    </Box>
  );

  if (field.type === "text" || field.type === "image" || field.type === "url") {
    return (
      <Box sx={{ mb: 2 }}>
        {renderLabel()}
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          value={localValue}
          onChange={handleChange}
        />
      </Box>
    );
  }

  if (field.type === "textarea") {
    return (
      <Box sx={{ mb: 2 }}>
        {renderLabel()}
        <TextField
          size="small"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={localValue}
          onChange={handleChange}
        />
      </Box>
    );
  }

  if (field.type === "color") {
    return (
      <Box sx={{ mb: 2 }}>
        {renderLabel()}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <input
            type="color"
            value={localValue || "#000000"}
            onChange={handleChange}
            style={{
              width: "36px",
              height: "36px",
              padding: "0",
              border: "1px solid #3f3f46",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
          />
          <TextField
            size="small"
            variant="outlined"
            value={localValue}
            onChange={handleChange}
            sx={{ flexGrow: 1 }}
          />
        </Box>
      </Box>
    );
  }

  if (field.type === "dropdown") {
    return (
      <Box sx={{ mb: 2 }}>
        {renderLabel()}
        <Select
          size="small"
          fullWidth
          value={localValue || field.options[0]}
          onChange={handleChange}
        >
          {field.options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </Box>
    );
  }

  if (field.type === "slider") {
    const numericValue = parseFloat(localValue) || 0;
    return (
      <Box sx={{ mb: 2 }}>
        {renderLabel()}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Slider
            value={numericValue}
            min={field.min || 0}
            max={field.max || 100}
            step={field.step || 1}
            onChange={handleSliderChange}
            sx={{ flexGrow: 1 }}
          />
          <Typography
            variant="caption"
            sx={{ minWidth: "40px", color: "text.primary" }}
          >
            {numericValue}
            {field.unit || "px"}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (field.type === "alignment") {
    return (
      <Box sx={{ mb: 2 }}>
        {renderLabel()}
        <ToggleButtonGroup
          value={localValue || "left"}
          sx={{ direction: "ltr" }}
          exclusive
          onChange={handleAlignmentChange}
          fullWidth
          size="small"
        >
          <ToggleButton value="left">
            <FormatAlignLeftIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="center">
            <FormatAlignCenterIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="right">
            <FormatAlignRightIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    );
  }

  if (field.type === "switch") {
    return (
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {renderLabel()}
        <Switch
          checked={Boolean(localValue)}
          onChange={handleSwitchChange}
          color="primary"
          size="small"
        />
      </Box>
    );
  }

  return null;
};
