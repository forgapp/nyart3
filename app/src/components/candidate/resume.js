import { h, Component } from 'preact';
import { database, storage } from '../../lib/firebase';

const Resume = ({ id }) => {
  const handleChange = (event) => {
   /* for(let i = 0; i < event.target.files.length; i++) {
      console.log(event.target.files[i]);
    }*/

    const storageRef = storage.ref('/resumes')
      .child(id);
    const file = event.target.files[0];
    const uploadTask = storageRef.child(file.name)
      .put(file, { contentType: file.type });


uploadTask.then(snapshot => {
  const resumeRef = database.ref('Resumes')
    .child(id)
    .push();
    resumeRef.child('Name').set(file.name)
    resumeRef.child('URL').set(snapshot.downloadURL);
})
    // forEach(file => console.log(file.name));
  }

  return (<div class="field">
    <div class="file is-large is-centered has-name">
      <label class="file-label">
        <input class="file-input" multiple type="file" name="resume" onChange={ handleChange }  />
        <span class="file-cta">
          <span class="file-icon">
            <i class="fa fa-upload"></i>
          </span>
          <span class="file-label">
            Large file…
          </span>
        </span>
        <span class="file-name">
          Screen Shot 2017-07-29 at 15.54.25.png
        </span>
      </label>
    </div>
  </div>);
};

export default Resume;
