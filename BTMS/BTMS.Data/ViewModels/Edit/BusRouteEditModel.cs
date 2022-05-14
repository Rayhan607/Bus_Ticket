using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BTMS.Data.ViewModels.Edit
{
    public class BusRouteEditModel
    {
        public int BusRouteId { get; set; }
        
        public string From { get; set; }
        
        public string To { get; set; }
        public BoardingPointEditModel[] BoardingPoints { get; set; }
    }
}
