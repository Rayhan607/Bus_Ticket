using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BTMS.Data.ViewModels.Edit
{
    public class BoardingPointEditModel
    {
        public int BoardingPointId { get; set; }
        public string PointName { get; set; }
        
        public string Address { get; set; }
    }
}
