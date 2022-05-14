export class AppConstants {
  static apiUrl: string = "http://localhost:5001/api";
  // static apiUrl:string="http://localhost:64793/api";
  static appName = "BTMS";
  static accessKey = 'C3194CB4-3C5E-45F0-A011-449DFB65A0EC';
  static navItems = [
    {
      label: 'Home',
      icon: 'home',
      link: '/home'
    },
    {

      label: 'Bus',
      icon: 'directions_bus',
      link: '/buses'

    },
    {

      label: 'Route',
      icon: 'alt_route',
      link: '/bus-routes'

    },
    {
      label: 'Schedules',
      icon: 'schedule',
      link: '/schedules'
    }
  ]
}
