![React Templator Logo](https://i.imgur.com/3GT3syb.png)

<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">React Templator</h3>

  <p align="center">
    A tiny 6kb library for form generation & validation in React & React Native
</p>

<!-- ABOUT THE PROJECT -->

## Justification

Creating dynamic forms in React & React Native cna be a pain.

- Do you want to use your own components?
- Creating dynamic, validated forms can be a pain. How many times have oyu done
  It can be dif
  Are you tired of doing this every time you want a nice, dynamic form in React?

```typescript
const cityRef = useRef<TextInput>(null);
const addressRef = useRef<TextInput>(null);
const postcodeRef = useRef<TextInput>(null);
const lastNameRef = useRef<TextInput>(null);
const passwordRef = useRef<TextInput>(null);
const firstNameRef = useRef<TextInput>(null);
const studentEmailRef = useRef<TextInput>(null);

const [dob, setDob] = useState<string>('');
const [city, setCity] = useState<string>('');
const [address, setAdress] = useState<string>('');
const [country, setCountry] = useState<string>('');
const [postcode, setPostcode] = useState<string>('');
const [lastName, setLastName] = useState<string>('');
const [password, setPassword] = useState<string>('');
const [firstName, setFirstName] = useState<string>('');
const [university, setUniversity] = useState<string>('');
const [gender, setGender] = useState<Gender | string>('');
const [studentEmail, setStudentEmail] = useState<string>('');
const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
const [isAgreedToTerms, setIsAgreedToTerms] = useState<boolean>(false);
const [isAgreedToPrivacyPolicy, setIsAgreedToPrivacyPolicy] = useState<boolean>(
  false
);
const [
  isPersonalizedEmailOptIn,
  setIsPersonalizedEmailOptIn
] = useState<boolean>(false);
```

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

#### NPM

    ```
    npm install react-templator
    ```

#### Yarn

    ```
    yarn add react-templator
    ```

<!-- USAGE EXAMPLES -->

## Usage

React Templator does not come with any built-in form components. Instead it allows you to use your own components. Start by defining a list of your components

```javascript
const elements = {
  'text-input': ({
    name,
    label,
    tabIndex,
    error,
    yourProp,
    ref,
    value,
    onChange,
    validate
  }) => (
    <div>
      {yourProp} {label}
      <input
        type='text'
        name={name}
        value={value}
        tabIndex={tabIndex}
        ref={ref}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
        onBlur={() => validate(false)}
      />
      <div className='error'>{error}</div>
    </div>
  ),
  submit: ({ label, tabIndex, value }) => (
    <input type='submit' tabIndex={tabIndex} value={label} />
  )
};
```

```javascript
// app.js
import { FormProvider } from "react-templator";

render(){
  <FormProvider elements={elements}>
    // Your app
  </FormProvider>
}
```

Now we've registered our elements, we can create a form schema which defines the inputs in our form.

```javascript
const schema: IFormSchema = [
  {
    // Required fields
    type: 'text-input',
    name: 'first_name',
    label: 'First name',

    // Additional fields (these are dynamically passed to your component and can be anything)

    yourProp: 'A field: ',
    // Validators
    required: true,
    minLength: 2,
    maxLength: 50
  },
  {
    type: 'text-input',
    name: 'last_name',
    label: 'Last name',

    yourProp: 'Another: ',

    required: true
  },
  {
    type: 'submit',
    name: 'submit'
  }
];
```

Lastly, now your form is defined, you need to use the `<Form/>` component to generate your form!

```
<Form
	schema={schema}
    onSubmit={(
       	data: Record<string, any>,
        setErrors: (errors: Record<string, string>) => void
    ) => {
    	// This is called when the form has submitted and all the local validation has passed
        alert("Form submitted! Data:", JSON.stringify(data));
    }}
 />
```

This is the result of our example:
![Example result](https://i.imgur.com/SvdaWsk.gif)

### Dynamic props

You're probably thinking - this is pretty nice for static forms, but what about forms that require custom properties such as loading states & custom server data, and also server side validation? Don't worry - React Templator handles this with `dynamicProps`. Going back to our previous example, all you need to do is provide a `dynamicProps` prop to the `<Form/>`, which is a {"input-name": value} object. We'll define a new Select component with custom data and also add a loading state in our example.

```javascript
const elements = {
  // ..Your other inputs

  'select': ({
    name,
    label,
    tabIndex,
    error,
    yourProp,
    ref,
    value,
    onChange,

    // Dynamic props
    options=[]
  }) => (
    <div>
      {label}
      <select name={name} onBlur={() => validate(false)} onChange={(event) => {
        onChange(event.currentTarget.value);
      }}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
      <input
        type='text'
        name={name}
        value={value}
        tabIndex={tabIndex}
        ref={ref}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
        onBlur={() => validate(false)}
      />
      <div className="error">{error}</div>
    </div>
  ),

  submit: ({
    label,
    tabIndex,
    value,

    // Dynamic props
    isLoading,
  }) => <input type='submit' tabIndex={tabIndex} value={isLoading ? "Loading..." : label}/>
```

And we'll modify our schema to add our new select component

```
const schema = [
...
 {
    type: 'select',
    name: 'fave_color',
    label: 'Favourite color',
    required: true
  }
]

```

Now when we render our `<Form/>` component, we can proide it with a `dynamicProps` prop to give our new select component some options, and our submit button a loading state. We'll also fake a server error if the last name is not `vrondakis`.

```javascript
const [isLoading, setIsLoading] = useState();

<Form
  schema={schema}
  dynamicProps={{
    fave_color: { colors },
    submit: {
      isLoading
    }
  }}
  onSubmit={(
    data: Record<string, any>,
    setErrors: (errors: Record<string, string>) => void
  ) => {
    // console.log('on submit', data);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (data.last_name !== 'vrondakis') {
        return setErrors({
          last_name: "Last name must be 'vrondakis'"
        });
      }

      alert(`Form submitted! Data: ${JSON.stringify(data)}`);
    }, 2000);
  }}
/>;
```

The result of the previous is:
![Example dynamic props](https://i.imgur.com/qfmpza9.gif)

### Layout elements

So far you've been shown how to define a dynamic automatically validating form without much effort at all. But what if you don't want a simple list of elements in your form, and you instead want a form with a different layout, such as two fields next to eachother, or section labels? This is where layout elements come in.

Just like form inputs, you can define layout elements which can have unlimited nested form inputs / other form layouts!

```javacript
const layoutElements = {
  "section": ({children, customProps, yourProp}) => (
    <div style={{backgroundColor: "rgba(255,0,0,.4)", marginBottom: 10}}>
      {yourProp}
      <div>
      {children}
      </div>
    </div>
  )
}
```

Then define your layout elements in your `<FormProvider/>` component just like you did with your elements.

You can now use your new layout element in your form schema:

```
const schema: IFormSchema = [
  {
    type: "section",
    yourProp: "Your information"
    children: [
      {
          type: 'text-input',
          name: 'first_name',
          label: 'First name',

          // Additional fields (these are dynamically passed to your component and can be anything)
          yourProp: 'A field: ',

          // Validators
          required: true,
          minLength: 2,
          maxLength: 50
        },
        {
          type: 'text-input',
          name: 'last_name',
          label: 'Last name',

          yourProp: 'Another: ',

          required: true
        },
    ]
  },

  {
    type: "section",
    yourProp: "Your dog",
    children: [
      {
          type: 'text-input',
          name: 'dog-name',
          label: 'Dog Name',
          required: true,
        },

              {
          type: 'text-input',
          name: 'breed',
          label: 'Breed',
          required: true,
        },
    ]
  },


  {
    type: 'submit',
    name: 'submit'
  }
];
```

The result of our example is this:

![Example layout](https://i.imgur.com/HGgHKlI.gif)

## Validators

### Default validators

```
"required"      => Requires the value to be there
"number"        => Requires the value to be a number
"minLength": 4  => Requires the value to be at least 4 characters
"maxLength": 18 => Requires the value to be a maximum of 18 characters
```

### Provider-wide validators

You can provide a `validators` object to your `<FormProvider/>` to define your own validators which can be used on any element in your schema. For example:

```
<FormProvider elements={elements} validators={{
  "has-property": (name, value, data) => !value || !value[data] ? `${name} must have ${data}`
}}/>
```

Then you can use it in your schema:

```
const schema = {
  {
    type: 'text-input',
    name: 'last_name',
    label: 'Last name',
    "has-property": "some-property"
  }
}
```

### Specific element validators

Each element in a schema can also provide its own validator through the use of the `validator` property, which takes a function with parameters of `name, value` validator function. This function can return `false` if there is no error, and `string` if there is an error error.

```
const schema = [
  {
    type: 'text-input',
    name: 'last_name',
    label: 'Last name',
    validator: (name, value) => name !== "hello" && `${name} must he 'hello'`
  }
]
```

## React Native

Since React Templator comes with no UI components, using the library with React Native is just as easy as React, with a few differences.

- Instead of the `<Form/>` component, be sure to use the `<FormNative>`

- Instead of using `onBlur` to validate your components, use `onSubmitEditing` and pass `true` to validate (refocus input). For example:

- Since React Native doesn't have the concept of forms or submitting them, you need to add some extra logic to your submit button component to get it to submit the form. Every element in your schema is passed a `submit` property, which you can use to submit your form. For example:

```
const elements = {
  "submit": ({submit}) => (
    <TouchableOpacity onPress={submit}><Text>Submit</Text>
  )
}
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Manolis Vrondakis - [@vrondakis](https://twitter.com/vrondakis) - manolisvrondakis@gmail.com
