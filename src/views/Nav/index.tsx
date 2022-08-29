import { AppBar, Button, Typography, Toolbar } from "@mui/material"

export function Nav() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shoppie
          </Typography>
          <Button onClick={() => {
            localStorage.removeItem('user')
            window.location.assign('/')
          }} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: '60px' }}></div>
    </>
  )
}
