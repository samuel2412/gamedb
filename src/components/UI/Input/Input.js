import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const Input = (props) => {
    
    let inputElement = null;
    let validationError = false;

    if (props.invalid && props.shouldValidate && props.touched) {
        validationError = true
     }


    switch (props.elementType) {
        case ('emailInput'):
            inputElement =
                <Grid item xs={12}>
                    <TextField
                        error={validationError}
                        helperText={validationError ? "Please enter valid email address." : null}
                        variant="outlined"
                        fullWidth
                        name="email"
                        label={validationError ?"Error" : "Email Address"}
                        type="email"
                        id="email"
                        autoComplete="email"
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />
                </Grid>

            break;
            case ('userInput'):
                inputElement =
                    <Grid item xs={12}>
                        <TextField
                            error={validationError}
                            helperText={validationError ? "User Name must be at least 7 characters." : null}
                            variant="outlined"
                            fullWidth
                            name="userName"
                            label={validationError ?"Error" : "User Name"}
                            type="text"
                            id="userName"
                            autoComplete="userName"
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}
                        />
                    </Grid>
    
                break;
                case ('avatarInput'):
                    inputElement =
                        <Grid item xs={12}>
                            <TextField
                                error={validationError}
                                helperText={validationError ? "Please enter valid value." : null}
                                variant="outlined"
                                fullWidth
                                name="avatarUrl"
                                label={validationError ?"Error" : "Avatar URL"}
                                type="text"
                                id="avatarUrl"
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}
                            />
                        </Grid>
        
                    break;

        case ('passwordInput'):
            inputElement =
                <Grid item xs={12}>
                    <TextField
                     error={validationError}
                     helperText={validationError ? "Password must be at least 7 characters" : null}
                        variant="outlined"
                        fullWidth
                        name="password"
                        label={validationError ?"Error" : "Password"}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />
                </Grid>
            break;

        default:
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
    }

    return (
        <div className='Input'>
            {inputElement}
        </div>
    );
}
export default Input;