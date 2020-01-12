import React from 'react';

import Image from 'material-ui-image';

const Media = props =>{

return(
        <Image
            src={props.image || 'image not found' }
            aspectRatio={(16 / 9)}
            disableSpinner
        />

);
}
export default Media;