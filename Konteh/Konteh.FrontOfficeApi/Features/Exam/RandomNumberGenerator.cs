namespace Konteh.FrontOfficeApi.Features.Exam;
public class RandomNumberGenerator : IRandomNumberGenerator
{
    private readonly Random _random = new Random();
    public int Next(int maxValue) => _random.Next(maxValue);
}
