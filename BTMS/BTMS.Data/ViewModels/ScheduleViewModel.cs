using System;

namespace BTMS.Data.ViewModels
{
    public class ScheduleViewModel
    {
        public int ScheduleId { get; set; }
       
        public DateTime JourneyDate { get; set; } //Date of Travels
        
        public DateTime DepartureTime { get; set; }
        
        public int MinTimeToReportBeforeDeparture { get; set; } = 15;
       
        public decimal FareAmount { get; set; }

        public string BusRoute { get; set; }
        public string Bus { get; set; }
        public int BusId { get; set; }
        
        public int BusRouteId { get; set; }
    }
}
