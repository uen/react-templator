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

You first need to register your input components so React Templator knows about them. You can do this by calling `registerElements` which accepts an object of type/render pairs. In this example, we will register a regular input and a submit button. These examples use HTML but they can be your own components.

```javascript
registerElements({
  'text-input': ({
    name,
    label,
    tabIndex,
    error,
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
        tabIndex={tabIndex}
        ref={ref}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
        onBlur={() => validate(false)}
      />
      {error}
    </div>
  ),
  submit: ({
    name,
    label,
    tabIndex,
    error,
    ref,
    value,
    onChange,
    validate
  }) => <input type='submit' />
});
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

_For more examples, please refer to the [Documentation](https://example.com)_

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
