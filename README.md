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
    onSubmit={(
       	data: Record<string, any>,
        setErrors: (errors: Record<string, string>) => void
    ) => {
      setIsLoading(true);

      setTimeout(() => )

    	// This is called when the form has submitted and all the local validation has passed
        alert("Form submitted! Data:", JSON.stringify(data));
    }}
 />

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

### Specific element validators

Each element in a schema can also provide its own validator through the use of the `validator` property, which takes a function with parameters of name, validator function. If this function returns something, it is treated as an error.

```
const schema = [
  {
    type: 'text-input',
    name: 'last_name',
    label: 'Last name',

    yourProp: 'Another: ',

    required: true
  }
]
```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/github_username/repo_name/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- []()
- []()
- []()

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/github_username
