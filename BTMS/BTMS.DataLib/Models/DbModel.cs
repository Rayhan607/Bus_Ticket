using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BTMS.DataLib.Models
{
    public enum BusType { AC=1, NonAc}
    public class Company
    {
        public Company()
        {
            this.Buses = new List<Bus>();
        }
        
        public int CompanyId { get; set; }
        [Required, StringLength(150)]
        public string AccessKey { get; set; }
        [Required, StringLength(50)]
        public string CompanyName { get; set; }
        [ StringLength(150)]
        public string CompanyAddress { get; set; }
        [ StringLength(20)]
        public string CompanyPhoneNumber { get; set; }
        [ StringLength(50), DataType(DataType.EmailAddress)]
        public string CompanyEmail { get; set; }

        public virtual ICollection<Bus> Buses { get; set; }
    }
    
    public class Bus
    {
        public Bus()
        {
            this.Schedules = new List<Schedule>();
        }
        public virtual ICollection<Schedule> Schedules { get; set; }
        [Key]
        public int BusId { get; set; }
        [Required, StringLength(50)]
        public string BusModel { get; set; }
        
        [Required]
        public string BusPlateNumber { get; set; } 
        [Required]
        public BusType BusType { get; set; } 
        [Required]
        public int Capacity { get; set; } 
        [StringLength(150)]
        public string Features { get; set; }
        [Required, Column(TypeName ="money")]
        public decimal Fare { get; set; }
        [Required, ForeignKey("Company")]
        public int CompanyId { get; set; }

        public virtual Company Company { get; set; }
    }

    public class BusRoute
    {
        public BusRoute()
        {
            this.Schedules = new List<Schedule>();
            this.BoardingPoints = new List<BoardingPoint>();
        }
       
        public int BusRouteId { get; set; }
        [Required, StringLength(50)]
        public string From { get; set; }
        [Required, StringLength(50)]
        public string To { get; set; }

        public virtual ICollection<Schedule> Schedules { get; set; }
        public virtual ICollection<BoardingPoint> BoardingPoints { get; set; }
    }
    public class BoardingPoint
    {
        public int BoardingPointId { get; set; }
        [Required, StringLength(50)]
        public string PointName { get; set; }
        [StringLength(150)]
        public string Address { get; set; }
	    [Required, ForeignKey("BusRoute")]
        public int BusRouteId { get; set; }
        public virtual BusRoute BusRoute { get; set; }
    }
    public class Schedule
    {
        public Schedule()
        {
            this.Bookings = new List<Booking>();
        }
        public int ScheduleId { get; set; }
        [Required, Column(TypeName = "date"), DataType(DataType.Date)]
        public DateTime JourneyDate { get; set; } //Date of Travels
        [Required,Column(TypeName ="time")]
        public TimeSpan DepartureTime { get; set; }
        [Required]
        public int MinTimeToReportBeforeDeparture { get; set; } = 15;
        [Required, Column(TypeName = "money")]
        public decimal FareAmount { get; set; }

        [Required, ForeignKey("Bus")]
        public int BusId { get; set; }
        [Required, ForeignKey("BusRoute")]
        public int BusRouteId { get; set; }
        //Navigation
        public virtual BusRoute BusRoute { get; set; }
        public virtual Bus Bus { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
    }
    public class Booking
    {
        public int BookingId { get; set; }
        [Required]
        public int NumberOfSeats { get; set; }
        [Required, Column(TypeName = "money")]
        public decimal FareAmount { get; set; }
        [Required, Column(TypeName = "money")]
        public decimal TotalAmount { get; set; }
        [Required, Column(TypeName = "date"), DataType(DataType.Date)]
        public DateTime BookingDate { get; set; }
        public bool BookingStatus { get; set; }
        [Required, ForeignKey("Schedule")]
        public int ScheduleId { get; set; }

        public virtual Schedule Schedule { get; set; }
    }
    public class BusDbContext : DbContext
    {
        public BusDbContext(DbContextOptions<BusDbContext> options) : base(options) { }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<BusRoute> BusRoutes { get; set; }
        public DbSet<BoardingPoint> BoardingPoints { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Booking> Bookings { get; set; }
    }
}
