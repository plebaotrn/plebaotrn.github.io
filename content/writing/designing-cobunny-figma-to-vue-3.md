---
title: "Building CoBunny, from Figma to Vue 3"
date: 2025-12-10
tag: Devlog
summary: "How I designed and built a coworking space booking site on my own, what went wrong along the way, and what I would do differently next time."
---
CoBunny started as my project for Interface Design and Development at Swinburne. The idea was simple: a website where students and freelancers can find a coworking space, check the details and book it in a few clicks. Building it turned out to be less simple, and I learned a lot from the parts that went wrong.

![The CoBunny home page](images/projects/cobunny/home.png "The home page. One big button, one clear job.")

## Starting with people, not code

Before I opened VS Code, I talked to three university students about how they find study spaces. They did not mind paying. What they hated was the hassle: too many steps, calendars that were hard to read, and no easy way to find a past booking without digging through emails.

So I wrote down the four things a user needs to do: find a space, compare spaces, book one, and manage their bookings. Every screen in CoBunny exists for one of those four jobs.

Before drawing any pages, I set up a small design system in Figma: the colour palette, font sizes, icons and the CoBunny logo. Having these ready meant every page would look like it belonged to the same site.

![CoBunny design system in Figma](images/projects/cobunny/designsytem.png "The design system: colours, type, icons and the logo.")

Then I designed every page in Figma, from rough sketches to the final look. I also made the shared parts, like the navigation bar, buttons, search bar and footer, as reusable pieces so I only had to design them once.

![CoBunny wireframes in Figma](images/projects/cobunny/wireframe.png "All the pages side by side, including the three booking steps.")

While testing the design, I noticed two steps in the booking flow asked for the same information twice. I merged them and the flow went from five steps to three. Fixing that in Figma took five minutes. Fixing it after coding would have taken a lot longer.

## Finding a space

The browse page shows every space as a card with a photo, name, location and price. You can search by name or feature, filter by location, price and size, and sort the results. If you like a space, tap the heart to save it to your favourites.

![Browse page with search and filters](images/projects/cobunny/browse.png "Search, filters and sorting all sit at the top, so you never lose them.")

Click a card and you get the full details: photos, a description, the features, how many people it fits, the price and the address. I wanted people to have everything they need before they decide, so they are not surprised later.

![Space details page](images/projects/cobunny/space-details.png "The details page, with price and rating right next to the name.")

## Booking it

To book, you need an account. I wrote the sign in and sign up logic myself as a Vue composable, which is a small reusable piece of code that any page can use. It checks your email and password, keeps you signed in after a refresh, and never stores your password with your session. The dashboard and booking pages are protected, so if you are not signed in, the site sends you to the sign in page first.

The booking form asks for a date, a time slot, the number of people and any special requests. A summary on the right updates as you go, so you always know the total price before you confirm.

![Booking form with a live summary](images/projects/cobunny/booking-form.png "The summary on the right updates as you fill in the form.")

## Managing your bookings

After booking, everything lives on your dashboard. You can see upcoming, past and cancelled bookings, plus a few quick numbers like total bookings, favourite spaces and how much you have spent.

Each booking has buttons to view, edit or cancel it. When you edit, the form already has your old details filled in, so you only change what you need.

## What went wrong, and what I learned

**Passing data around by hand.** At first, I passed booking data from page to page manually. The browse page passed it to the card, the card sent changes back up, and the dashboard needed its own copy. It worked, but it got messy fast. Then I learned about Pinia, a tool that keeps shared data in one place. I moved all bookings into one Pinia store, and now the booking form and the dashboard always see the same thing. Adding a booking on one page shows up on the other straight away.

```js
export const useBookingStore = defineStore('bookings', () => {
  const bookings = ref([])

  const addBooking = (booking) => {
    const newBooking = {
      id: Date.now(),
      ...booking,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }
    bookings.value.push(newBooking)
    saveToLocalStorage()
    return newBooking
  }

  return { bookings, addBooking }
})
```

Any page can now call `addBooking()`, and every other page that shows bookings updates by itself.

**Staying signed in.** My first version forgot you every time you refreshed the page. I fixed it by saving the signed in user in the browser and loading it back as soon as the site starts:

```js
const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem('cobunny_user')
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser)
  }
}

loadUserFromStorage()
```

Before saving the user, I also take the password out, so it never sits in the browser next to your session:

```js
const userWithoutPassword = { ...user }
delete userWithoutPassword.password

currentUser.value = userWithoutPassword
localStorage.setItem('cobunny_user', JSON.stringify(userWithoutPassword))
```

One small thing I noticed: if you sign out in one tab, another open tab does not know until you refresh it. That was outside the scope of the unit, but it is on my list.

**Using two styling tools at once.** This was my biggest mistake. I started with Bootstrap to move fast, then added Tailwind for more control. The two kept overriding each other, and the site had to load both, which made it heavier than it needed to be. Next time I will pick one before I start and stick with it.

## What happened next

For the unit, CoBunny saved everything in the browser. That was fine for a class project, but it meant your bookings only lived on one device. After the unit, I moved sign in and bookings to Supabase, a real database, so your data now follows you anywhere.

People who tried the final version called it straightforward. For a booking site, I think that is the best thing anyone can say.
