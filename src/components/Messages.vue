<template lang="pug">
  f7-page
    navbar()
    // Messagebar
    f7-messagebar(
      :placeholder='placeholder',
      ref='messagebar',
      :attachments-visible='attachmentsVisible',
      :sheet-visible='sheetVisible'
      )
      // Link to toggle Sheet
      f7-link(icon-if-ios='f7:camera_fill', icon-if-md='material:camera_alt', slot='inner-start', @click='sheetVisible = !sheetVisible')
      // Send Message Link
      f7-link(icon-if-ios='f7:arrow_up_fill', icon-if-md='material:send', slot='inner-end', @click='sendMessage')
      // Attachments
      f7-messagebar-attachments
        f7-messagebar-attachment(v-for='(image, index) in attachments', :key='index', :image='image', @attachment:delete='deleteAttachment(image)')
      // Sheet
      f7-messagebar-sheet
        f7-messagebar-sheet-image(v-for='(image, index) in images', :key='index', :image='image', :checked='attachments.indexOf(image) >= 0', @change='handleAttachment')


    // Messages
    f7-messages(ref='messages')
      f7-messages-title
        h2 teamId: {{teamId}} / channelId: {{channelId}}
        button(@click="onClick()") set
        b Sunday, Feb 9,
        |  12:58
      f7-message(v-for='(message, index) in messagesData', :key='index', :type='message.type', :text='message.text', :image='message.image', :name='message.name', :avatar='message.avatar', :first='isFirstMessage(message, index)', :last='isLastMessage(message, index)', :tail='isTailMessage(message, index)')
        img(slot="image", v-if="message.attachments", v-for='(img, index) in message.attachments', :src="img")
</template>
<script>
import { mapGetters } from 'vuex';

import Navbar from './navbar/Navbar';

export default {
  props: {
    teamId: {
      type: String,
      required: true
    },
    channelId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      attachments: [],
      sheetVisible: false,
      // Sheet images available
      images: [
        'https://picsum.photos/300/200?image=0',
        'https://picsum.photos/300/200?image=1',
        'https://picsum.photos/300/200?image=2',
        'https://picsum.photos/300/200?image=3'
      ],

      // Initial messages
      messagesData: [
        {
          type: 'sent',
          text: 'Hi, Kate'
        },
        {
          type: 'sent',
          text: 'How are you?'
        },
        {
          name: 'Kate',
          type: 'received',
          text: 'Hi, I am good!',
          avatar: 'http://lorempixel.com/100/100/people/9'
        },
        {
          name: 'Blue Ninja',
          type: 'received',
          text: 'Hi there, I am also fine, thanks! And how are you?',
          avatar: 'http://lorempixel.com/100/100/people/7'
        },
        {
          type: 'sent',
          text: 'Hey, Blue Ninja! Glad to see you ;)'
        },
        {
          type: 'sent',
          text: 'Hey, look, cutest kitten ever!'
        },
        {
          type: 'sent',
          image: 'http://lorempixel.com/200/260/cats/4/'
        },
        {
          name: 'Kate',
          type: 'received',
          text: 'Nice!',
          avatar: 'http://lorempixel.com/100/100/people/9'
        },
        {
          name: 'Kate',
          type: 'received',
          text: 'Like it very much!',
          avatar: 'http://lorempixel.com/100/100/people/9'
        },
        {
          name: 'Blue Ninja',
          type: 'received',
          text: 'Awesome!',
          avatar: 'http://lorempixel.com/100/100/people/7'
        }
      ],
      // Dummy data
      people: [
        {
          name: 'Kate Johnson',
          avatar: 'http://lorempixel.com/100/100/people/9'
        },
        {
          name: 'Blue Ninja',
          avatar: 'http://lorempixel.com/100/100/people/7'
        }
      ],
      answers: [
        'Yes!',
        'No',
        'Hm...',
        'I am not sure',
        'And what about you?',
        'May be ;)',
        'Lorem ipsum dolor sit amet, consectetur',
        'What?',
        'Are you sure?',
        'Of course',
        'Need to think about it',
        'Amazing!!!'
      ],
      // Response in progress flag
      responseInProgress: false
    };
  },
  computed: {
    ...mapGetters({
      username: 'username',
      currentTeamName: 'currentTeamName'
    }),
    attachmentsVisible() {
      return this.attachments.length > 0;
    },
    placeholder() {
      const self = this;
      return self.attachments.length > 0 ? 'Add comment or Send' : 'Message';
    }
  },
  methods: {
    onClick() {
      // this.$store.commit('SET_SELECTED_TEAM', this.teamId);
      this.$store.commit('SET_CURRENT_TEAM_ID', 189);
    },
    // Messages rules for correct styling
    isFirstMessage(message, index) {
      const self = this;
      const previousMessage = self.messagesData[index - 1];
      if (message.isTitle) return false;
      if (
        !previousMessage ||
        previousMessage.type !== message.type ||
        previousMessage.name !== message.name
      )
        return true;
      return false;
    },
    isLastMessage(message, index) {
      const self = this;
      const nextMessage = self.messagesData[index + 1];
      if (message.isTitle) return false;
      if (
        !nextMessage ||
        nextMessage.type !== message.type ||
        nextMessage.name !== message.name
      )
        return true;
      return false;
    },
    isTailMessage(message, index) {
      const self = this;
      const nextMessage = self.messagesData[index + 1];
      if (message.isTitle) return false;
      if (
        !nextMessage ||
        nextMessage.type !== message.type ||
        nextMessage.name !== message.name
      )
        return true;
      return false;
    },
    sendMessage() {
      const self = this;

      const text = self.messagebar
        .getValue()
        .replace(/\n/g, '<br>')
        .trim();

      if (text.length === 0) {
        // exit when empty messagebar text is empty
        return;
      }

      const attachments = this.attachments.slice();

      // Clear messagebar area
      self.messagebar.clear();

      // Focus area
      if (text.length) self.messagebar.focus();

      // Add sent message
      self.messagesData.push({ text, attachments });

      // Mock response
      if (self.responseInProgress) {
        return;
      }

      // self.responseInProgress = true;
      // setTimeout(() => {
      //   const answer =
      //     self.answers[Math.floor(Math.random() * self.answers.length)];
      //   const person =
      //     self.people[Math.floor(Math.random() * self.people.length)];
      //   self.messages.showTyping({
      //     header: `${person.name} is typing`,
      //     avatar: person.avatar
      //   });
      //   setTimeout(() => {
      //     self.messagesData.push({
      //       text: answer,
      //       type: 'received',
      //       name: person.name,
      //       avatar: person.avatar
      //     });
      //     self.messages.hideTyping();
      //     self.responseInProgress = false;
      //   }, 4000);
      // }, 1000);
    },
    onF7Ready() {
      const self = this;
      // References to us APIs
      self.messagebar = self.$refs.messagebar.f7Messagebar;
      self.messages = self.$refs.messages.f7Messages;
    },
    // BAR ------------
    deleteAttachment(image) {
      const self = this;
      const index = self.attachments.indexOf(image);
      self.attachments.splice(index, 1)[0]; // eslint-disable-line
    },
    handleAttachment(e) {
      const self = this;
      const index = self
        .$$(e.target)
        .parents('label.checkbox')
        .index();
      const image = self.images[index];
      if (e.target.checked) {
        // Add to attachments
        self.attachments.unshift(image);
      } else {
        // Remove from attachments
        self.attachments.splice(self.attachments.indexOf(image), 1);
      }
    }
    // sendMessage() {
    //   const self = this;
    //   const text = self.messagebar
    //     .getValue()
    //     .replace(/\n/g, '<br>')
    //     .trim();
    //   // the rest of logic to send a message
    // },
    // onF7Ready() {
    //   const self = this;
    //   self.messagebar = self.$refs.messagebar.f7Messagebar;
    // }
  },
  components: {
    Navbar
  },
  mounted() {
    console.log('this.teamId:', this.teamId);
    // this.$store.commit('SET_CURRENT_TEAM_ID', this.teamId);

    this.$store.dispatch('loadChannelMessages', {
      teamId: parseInt(this.teamId, 10),
      channelId: parseInt(this.channelId, 10)
    });
  }
};
</script>
