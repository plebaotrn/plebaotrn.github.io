---
title: "Building Happier, a habit tracker for Android"
date: 2025-11-30
tag: Devlog
summary: "How I built a simple habit tracking app in Kotlin, why I changed the database halfway through, and the small bugs that taught me the most."
---
Happier started as my project for Software Development for Mobile Devices at Swinburne. The goal was simple: help people build good habits without making it feel like homework. Most habit apps I tried had too many settings and too many screens. I wanted one where you can tick off a habit in a few taps and get on with your day.

## Who it is for

Before writing any code, I wrote a few short user stories to keep me focused:

- A busy student who wants to tick off a habit quickly, so they don't forget during the day.
- Someone who learns visually and wants progress bars to stay motivated.
- Someone who checks their phone often and wants a widget, so they never need to open the app.
- Someone building a new habit who needs a little encouragement when it gets hard.

Every feature in Happier comes from one of these stories.

## A look around the app

The home screen has three tabs. **Today** shows the habits you need to do now. **Weekly** shows the whole week, with a circle for each day. **Overall** shows your stats, like your best streak and your most consistent habit.

{{< phones
  "images/projects/happier/today.png|Today: what you need to do now."
  "images/projects/happier/weekly.png|Weekly: tap a circle to mark that day."
  "images/projects/happier/overall.png|Overall: your stats in one place."
>}}

I picked a warm orange as the main colour because it feels energetic and friendly. Each habit is a big card, and the add button sits in the bottom right corner where your thumb already is. Every button is at least 48dp, which is the size Android recommends so people don't miss when they tap.

When you create a habit, you choose a name, a category, an emoji icon, a colour and how many days a week you want to do it. Tap any habit to see its own page with your current streak, best streak and progress.

{{< phones
  "images/projects/happier/add-habit.png|Create a habit with your own icon and colour."
  "images/projects/happier/habit-detail.png|Each habit has its own page with streaks and progress."
  "images/projects/happier/swipe-delete.png|Swipe left to delete. Changed your mind? Tap undo."
>}}

## Keeping the code tidy

I used a pattern called MVVM. In simple words, the screens only show things, the ViewModel holds the logic, and the database stores the data. Each part has one job. This made adding new features much easier later, because I always knew where new code should go.

The screens watch the data using LiveData. When you tick off a habit, the database changes, and every screen that shows that habit updates by itself. I never had to refresh anything by hand.

## The database change that saved the weekly view

My first version only counted how many days you had done a habit in total. That worked for a progress bar, but it couldn't answer simple questions like "did I do this on Wednesday?". So the weekly view was impossible.

I fixed it by adding a second table that saves one row for each day you complete a habit:

```kotlin
@Entity(
    tableName = "completion_history",
    foreignKeys = [
        ForeignKey(
            entity = Habit::class,
            parentColumns = ["id"],
            childColumns = ["habitId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index(value = ["habitId", "completionDate"], unique = true)]
)
data class CompletionHistory(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val habitId: Int,
    val completionDate: Long // Normalized to midnight
)
```

Now the app knows exactly which days you did each habit. That made the weekly circles possible, let you go back and tick a day you forgot, and made streaks accurate. When you delete a habit, all its days are deleted with it, so nothing is left behind.

## Three bugs that taught me the most

**Progress going above 100 percent.** If your target was 7 days and you did 8, the progress bar said 114 percent. Not wrong, but not helpful either. The fix was one line that caps it at 100:

```kotlin
progressBarDetail.progress = minOf(completionRate.toInt(), 100)
```

**Days that didn't match.** Ticking a habit at 8am and checking it at 9pm counted as two different times, so the app sometimes thought they were different days. I fixed it by moving every date to midnight before saving or comparing it:

```kotlin
fun normalizeMillisToMidnight(timeMillis: Long): Long {
    val cal = Calendar.getInstance().apply { timeInMillis = timeMillis }
    cal.set(Calendar.HOUR_OF_DAY, 0)
    cal.set(Calendar.MINUTE, 0)
    cal.set(Calendar.SECOND, 0)
    cal.set(Calendar.MILLISECOND, 0)
    return cal.timeInMillis
}
```

**A widget that didn't update.** The home screen widget was the hardest part of the project. Widgets run outside the app, so they can't use LiveData, and they only support a small set of simple views. My widget sometimes showed old numbers. For now, I added a refresh button. A full fix would update it on a schedule in the background, which is on my list for later.

## The widget

Even with that bug, the widget is my favourite feature. It shows how many habits you have, how many you finished today and your best streak, plus a short message that changes with your progress:

```kotlin
val motivationMessage = when {
    completedToday >= totalHabits && totalHabits > 0 -> "🏆 Perfect day!"
    completedToday > 0 -> "💪 Keep going!"
    totalHabits == 0 -> "🌟 Create a habit!"
    else -> "🌟 Start today!"
}
```

![The Happier widget on an Android home screen](images/projects/happier/widget.png "The widget. Your day at a glance, no need to open the app.")

## Small details that matter

Deleting a habit by accident is annoying, so swiping left deletes it but shows an undo button straight away. Deleting from the habit page asks you to confirm first. The app also works fully offline, uses no background services, and only updates when it needs to, so it is kind to your battery.

## What I learned

1. **Plan before you code.** Drawing the screens and the database first saved me hours later.
2. **A good structure pays off.** MVVM made every new feature easier to add.
3. **Test early.** Some of my bugs would have been much quicker to fix if I had caught them sooner.
4. **Mobile is different.** Small screens, thumbs instead of a mouse, and quick moments between other things all change how you design.

Next, I would like to add reminders, charts that show your progress over time, and a dark mode. The whole app took about 30 hours over two weeks, and it is the project that made me really enjoy building for phones.
