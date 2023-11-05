"use client";
import { Backdrop, Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { TextFieldCustom } from "./_components/TextFieldCustom";
import * as Yup from "yup";
import { AuthService } from "@/services/auth/AuthService";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Last name is required"),
  username: Yup.string().required("Số điện thoại là trường bắt buộc"),
});

export default function Home() {
  console.log("re render");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values: ", values);
      AuthService.login(values.username, values.password);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          padding: 4,
          width: 550,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: 40,
              fontWeight: "500",
              textAlign: "center",
              mb: 4,
            }}
          >
            Đăng nhập vào hệ thống
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldCustom
                error={!!formik.errors.username}
                helperText={formik.errors.username}
                fullWidth
                label="Tài khoản"
                name="username"
                onChange={formik.handleChange}
                required
                value={formik.values.username}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                error={!!formik.errors.password}
                helperText={formik.errors.password}
                fullWidth
                label="Mật khẩu"
                name="password"
                type="password"
                onChange={formik.handleChange}
                required
                value={formik.values.password}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{
                marginRight: 4,
                fontSize: 18,
              }}
              onClick={formik.submitForm}
            >
              Đăng nhập
            </Button>
            <Button
              href="/"
              sx={{
                fontSize: 18,
              }}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={false}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
