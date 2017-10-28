using System.Collections.Generic;

namespace Repositories
{
    public class Question
    {
        public string Str { get; set; }
        public int TimeToAnswer { get; set; }
        public string RightAnswer { get; set; }
        public Dictionary<string,string> CustomMessagesToAnswers { get; set; }
        public bool IsTaken { get; set; }
    }

    public static class StaticRepository
    {
        public static Question[] Questions = new Question[]
        {
            new Question()
            {
                Str = "To varify yourself please type the last word from your VK status",
                TimeToAnswer = 30,
                RightAnswer = "свет",
                CustomMessagesToAnswers = new Dictionary<string, string>()
                {
                    {"light", "Ой, кажется, у меня есть небольшие трудности с английским. "
                        +"Немогли бы Вы ввести русский перевод слова light." }
                }
            }
        };

        public static Question GetQuestion()
        {
            foreach (var question in Questions)
            {
                if (!question.IsTaken)
                {
                    return question;
                }
            }
            return null;
        }
    }
}
