using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BTMS.Data.ViewModels.Input
{
    public class BusRouteInputModel
    {
       
        
        public string From { get; set; }
        
        public string To { get; set; }
        public BoardingPointInputModel[] BoardingPoints { get; set; }
    }
}
