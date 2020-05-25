export default {
  dayOfTheWeekShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  dayOfTheWeekLong: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  monthOfTheYearShort: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aut", "Sep", "Oct", "Nov", "Dec"],
  simplifyDate: (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
};