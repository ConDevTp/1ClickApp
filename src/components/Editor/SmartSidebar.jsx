import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { shallow } from "zustand/shallow";
import { ControlsRegistry } from "../../controls";
import { SchemaRegistry } from "../../schemas";
import { useStore } from "../../store/useStore";
import { getNestedValue, resolveSection } from "../../utils/resolver";
import { FieldRenderer } from "./FieldRenderer";

const editorTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#3b82f6" },
    background: { paper: "#1e1e1e", default: "#121212" },
    text: { primary: "#ffffff", secondary: "#a1a1aa" },
    divider: "#3f3f46",
  },
  typography: {
    fontFamily: "inherit",
    subtitle1: { fontSize: "0.95rem", letterSpacing: "0.5px" },
    subtitle2: {
      fontSize: "0.85rem",
      textTransform: "uppercase",
      color: "#a1a1aa",
    },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
    },
    MuiTextField: {
      styleOverrides: {
        root: { "& .MuiOutlinedInput-root": { backgroundColor: "#27272a" } },
      },
    },
    MuiSelect: { styleOverrides: { root: { backgroundColor: "#27272a" } } },
  },
});

const SmartSidebar = () => {
  const active = useStore((s) => s.activeElement, shallow);
  const sections = useStore((s) => s.sections);
  const addListItem = useStore((s) => s.addListItem);
  const removeListItem = useStore((s) => s.removeListItem);
  const setActiveElement = useStore((s) => s.setActiveElement);
  const undo = useStore((s) => s.undo);
  const redo = useStore((s) => s.redo);
  const pastCount = useStore((s) => s.past.length);
  const futureCount = useStore((s) => s.future.length);

  if (!active.sectionId) {
    return (
      <ThemeProvider theme={editorTheme}>
        <Paper
          elevation={0}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 0,
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "background.paper",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              پنل ویرایش
            </Typography>
            <Box dir="ltr">
              <IconButton
                onClick={undo}
                disabled={pastCount === 0}
                size="small"
                color="primary"
              >
                <UndoIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={redo}
                disabled={futureCount === 0}
                size="small"
                color="primary"
              >
                <RedoIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              color: "text.secondary",
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2">
              یک المان را برای ویرایش انتخاب کنید
            </Typography>
          </Box>
        </Paper>
      </ThemeProvider>
    );
  }

  const section = sections[active.sectionId];
  const controls = ControlsRegistry[section?.type];
  const resolvedData = resolveSection(
    SchemaRegistry[section?.type],
    section?.overrides,
  );

  if (!controls) return <div className="text-danger p-3">تنظیمات یافت نشد</div>;

  // 🌟 تطبیق مسیر بر اساس معماریِ نرمال‌سازی شده
  const isListItemSelected =
    active.fieldPath && active.fieldPath.match(/\.byId\.([^.]+)$/);

  let activeListMatch = null;
  let activeItemId = null;
  let activeItemFields = null;

  if (isListItemSelected && controls.lists) {
    const match = active.fieldPath.match(/(.*)\.byId\.([^.]+)$/);
    if (match) {
      const listPath = match[1];
      activeItemId = match[2];
      const listControl = controls.lists.find((l) => l.path === listPath);
      if (listControl) {
        activeListMatch = listControl;
        activeItemFields = listControl.itemFields;
      }
    }
  }

  const filteredGroups = controls.groups.reduce((acc, group) => {
    if (isListItemSelected) return acc;
    const filteredFields = group.fields.filter((field) => {
      if (!active.fieldPath) return true;
      return (
        field.path.includes(active.fieldPath) ||
        active.fieldPath.includes(field.path)
      );
    });
    if (filteredFields.length > 0)
      acc.push({ ...group, fields: filteredFields });
    return acc;
  }, []);

  return (
    <ThemeProvider theme={editorTheme}>
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            پنل ویرایش
          </Typography>
          <Box dir="ltr">
            <IconButton
              onClick={undo}
              disabled={pastCount === 0}
              size="small"
              color="primary"
            >
              <UndoIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={redo}
              disabled={futureCount === 0}
              size="small"
              color="primary"
            >
              <RedoIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            flexGrow: 1,
            overflowY: "auto",
            bgcolor: "background.default",
          }}
        >
          {active.fieldPath && (
            <Button
              variant="outlined"
              size="small"
              fullWidth
              startIcon={<ArrowBackIcon />}
              onClick={() => setActiveElement(active.sectionId, null)}
              sx={{
                mb: 3,
                borderColor: "divider",
                color: "text.primary",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              بازگشت به تنظیمات کل
            </Button>
          )}

          {isListItemSelected && activeItemFields ? (
            <Box
              sx={{
                mb: 4,
                bgcolor: "background.paper",
                p: 2,
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{ mb: 2, pb: 1, borderBottom: 1, borderColor: "divider" }}
              >
                ویرایش {activeListMatch.label}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {activeItemFields.map((field) => (
                  <FieldRenderer
                    key={field.path}
                    field={field}
                    sectionId={active.sectionId}
                    basePath={`${activeListMatch.path}.byId.${activeItemId}`}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            filteredGroups.map((group, index) => (
              <Box
                key={index}
                sx={{
                  mb: 4,
                  bgcolor: "background.paper",
                  p: 2,
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 2, pb: 1, borderBottom: 1, borderColor: "divider" }}
                >
                  {group.label}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {group.fields.map((field) => (
                    <FieldRenderer
                      key={field.path}
                      field={field}
                      sectionId={active.sectionId}
                    />
                  ))}
                </Box>
              </Box>
            ))
          )}

          {!isListItemSelected &&
            controls.lists?.map((l, i) => {
              const listItems = getNestedValue(resolvedData, l.path) || [];
              return (
                <Box
                  key={i}
                  sx={{
                    mt: 3,
                    bgcolor: "background.paper",
                    p: 2,
                    borderRadius: 2,
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                  >
                    لیست {l.label}
                  </Typography>
                  {listItems.map((item, index) => (
                    <Box
                      key={item.id || index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1,
                        mb: 1,
                        bgcolor: "#27272a",
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ maxWidth: "150px" }}
                      >
                        {item.content?.text || `آیتم ${index + 1}`}
                      </Typography>
                      <Box>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            setActiveElement(
                              active.sectionId,
                              `${l.path}.byId.${item.id}`,
                            )
                          }
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            removeListItem(active.sectionId, l.path, item.id)
                          }
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    onClick={() => addListItem(active.sectionId, l.path)}
                    sx={{ mt: 1 }}
                  >
                    + افزودن
                  </Button>
                </Box>
              );
            })}
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default SmartSidebar;
