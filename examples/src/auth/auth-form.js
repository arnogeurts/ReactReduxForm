
import {createForm} from '../../../src/index';
import {isRequired} from '../base/validator';

export default createForm({
    name: 'auth',
    selector: state => state,
    fields: {
        username: {
            validators: [isRequired]
        },
        password: {
            validators: [isRequired]
        }
    }
});
