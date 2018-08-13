# KNOWLEDGE ROCKET

## Prototype Patterns
- All Teacher Views have a NavBar on top, except: HomePage & RocketQuestion sent to the student.
- All Teacher Views have a SideBar to the left, , except: HomePage & RocketQuestion sent to the student.
- If a user navigates to an internal Route without Authenticating themselves.
    * Redux State will have a UID / Token if Authenticated
    * Otherwise Show: Log-In or Sign Up Component.

## Component Specific Features

### `<NavBar>` (Top)
- Should always display the Sign Out Button (To The Right).
- Should Have the current Path Displayed ex: [Home > Rockets].
    * Path Should be interactive, allowing the user to click on the sections and sub-sections to navigate.
    * Consider the use of `BrowserRouter` and implement similar to ReactNative Navigation Flow.
    * Implement a Stack or Hard Code into Routes:
        - Stack Example: 
            1. Array in Redux State where we push each location and address into.
            2. Delete elements beyond the index of currently selected item if navigated away.
            3. Always keep at least 1 element, `Home` in the array.
        - Hard Code Example: If route is `/classes/create` then the Nav will show Home > Classes > Create or Edit Class
    * Use `this.props.history.push()` to navigate.
- Stretch Implement Mobile Navigation with `< CURRENT PAGE >`.


### `<Home>`
- Should Display Sign-Up & Sign-In Buttons on the top right?
- Should Display a CTA that links to Sign-Up/Auth
- Should Contain Information about the Product in details.

### `<Auth>`
- Should use External Authentication (Email-Password, Google, Facebook, Etc.)
- Should redirect to `<RocketList>` once authenticated.
- Should properly handle failure to authenticate with message and redirect?

### `<RocketQuestion>`
- Should display the RocketQuestion for the scheduled date.
- Should have functionality to allow picking 1 answer.
- Should have functionality for Submitting the answer.
- Should display the correct answer.
- Stretch: Should display an explanation for the answer, and possible resources or links to read?

### `<ControlPanel>` (Left)
- Higher Order Component: Contains the `<ControlPanel>` and the main content sections.
- It will always display the `ControlPanel` on the left hand side.
- It will house the following Components to the right of the `ControlPanel`:
    1. Rockets List.
    2. Rocket Creation.
    3. Classes List.
    4. Classes Creation / Edit.
    5. Billing.
    6. Settings.
- Dispatch an Action to Change a Prop on State that will trigger a render on a component.
- Stretch: Convert to class component and implement into a drop down for Mobile View.

### `<AddButton>`
- Simple Add Button, to be reused all over the application.
- Takes props: link_to={`URL`}, large={`Boolean`}.

### `<RocketButton>`
- Simple Generic Button, to be reused all over the application.
- Takes props:
    1. link_to={`URL`}.
    2. type={`normal,submit,danger`}.
    3. label={`String Label`}.
    4. dimensions={`[width,height]`} Array of Integers.
        - Dimensions is Optional.
        - Will resize automatically `label.length` otherwise.

### `<RocketList>`
- Should Display `<AddButton>` when Empty (Navigates to Rocket Creation)
- Should Display list of `<RocketCard>` (Navigates to Rocket Edit/View)

### `<RocketCard>`
- gets Props to Decide if Showing `<AddButton>` or Actual Rocket Info and EditButton.
- Contains `<RocketButton>` with the label `EDIT`

### `<Rocket>`
- Should Display Rocket or Allow for Creation of Rocket.
- Refer to Rocket Form for more Details.

### `<CohortList>` The Word: `Class` Is Reserved
- Should Display `<AddButton>` when Empty (Navigates to Class Creation)
- Should Display list of `<CohortCard>` (Navigates to Rocket Edit/View)
### `<CohortCard>`
- gets Props to Decide if Showing `<AddButton>` or Actual Class Info.
### `<Cohort>` The Word: `Class` Is Reserved
- Should Display Forms for Creation and Editing Classes.
- Should Contain Functionality to import From CSV. (Make this a Pro Feature?)
- Should Contain Functionality to add students manually.
- Should Contain Student List with Functionality to Remove, or Edit? Student.
- Should Contain a Schedule with Each of the Rockets assigned to the Class
    * Each Rocket should have a scheduled date where it begins, this can be edited.
- Should Contain an `<AddButton>` that will allow to add More Rockets to the class.
    * Perhaps from a DropDownList or a Pop-Up-Modal?
        - List should have a CreateNewRocket option.

### `<Billing>`
- Use Stripe for Billing
- 1 Year Sub $9.99?
- 1 Year Premium Sub $29.99?
- Monthly Sub?
- Should have a `<RocketButton>` with label `Buy Now`.

### `<Settings>`
- Allow configuring of the user's information.
- Consider Authentication credentials.
- Consider Handling email-password users.
- Consider Handling non email-password users.
- Should have a `<RocketButton>` with the label `Save`
- Should have a `<RocketButton>` with the label `Cancel`


![IMG](/mockups/01_HomePage.PNG "img")
![IMG](/mockups/02_Landing_AfterLogin.PNG "img")
![IMG](/mockups/03_After_Adding_Rocket.PNG "img")
![IMG](/mockups/04_Rocket_Question.PNG "img")
![IMG](/mockups/05_Roket_Question_form.PNG "img")
![IMG](/mockups/06_Add_New_Class.PNG "img")
![IMG](/mockups/07_After_Adding_Classes.PNG "img")
![IMG](/mockups/08_Class_Management_GUI.PNG "img")
![IMG](/mockups/09_Billing_Purchasing.PNG "img")
![IMG](/mockups/10_User_Profile_Settings.PNG "img")