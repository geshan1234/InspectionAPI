namespace InspectionApi.Models
{
    public class Inspection
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Comments { get; set; }
        public int InspectionTypeId { get; set; }
        public InspectionType? InspectionType { get; set; }
    }
}
