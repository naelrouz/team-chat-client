<template lang="pug">
  f7-page
    navbar()
    // Messagebar
    f7-messagebar.messages__messagebar(
      :placeholder='placeholder',
      ref='messagebar',
      :attachments-visible='attachmentsVisible',
      :sheet-visible='sheetVisible',
      @keypress.prevent.enter.native="sendMessage"
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
        //- button(@click="onClick()") set
        b Sunday, Feb 9,
        |  12:58
      f7-message(
        v-for='(message, index) in channelMessages', 
        :key='index', 
        :type='message.type', 
        :text-header="msgDateFormat(message.createdAt)"
        :text='message.text',
        :image='message.image', 
        :name="message.user.username", 
        :avatar='message.avatar', 
        :first='isFirstMessage(message, index)',       
        :last='isLastMessage(message, index)', 
        :tail='isTailMessage(message, index)')
        
        img(slot="image", v-if="message.attachments", v-for='(img, index) in message.attachments', :src="img")
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

// import { createMessage } from '../api';

import Navbar from './navbar/Navbar';
import messages from '../store/store-modules/messages';

import CHANNEL_MESSAGES from '../api/graphql/queries/CHANNEL_MESSAGES.gql';
import NEW_CHANNEL_MESSAGE from '../api/graphql/subscriptions/NEW_CHANNEL_MESSAGE.gql';

export default {
  apollo: {
    channelMessages: {
      query: CHANNEL_MESSAGES,
      variables: {
        channelId: 2
      },
      subscribeToMore: {
        document: NEW_CHANNEL_MESSAGE,
        // Variables passed to the subscription. Since we're using a function,
        // they are reactive
        variables() {
          return {
            channelId: 2
          };
        },
        // Mutate the previous result
        updateQuery: (previousResult, { subscriptionData }) => {
          // Here, return the new result from the previous with the new data
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        }
      }
    }
  },
  props: {
    incomingTeamId: {
      type: String,
      required: true
    },
    incomingChannelId: {
      type: String,
      required: true
      // validator(value) {
      //   return parseInt(value, 10).isNumber();
      // }
    }
  },
  data() {
    return {
      channelMessages: [],
      // messagesData: [],
      teamId: parseInt(this.incomingTeamId, 10),
      channelId: parseInt(this.incomingChannelId, 10),
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
      userId: 'userId',
      messagesData: 'messages',
      currentChannelId: 'currentChannelId'
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
    // messageType(message) {
    //   return message.user.id === this.userId ? 'sent' : 'received';
    // },
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
    sendMessage(e) {
      // e.preventDefault();

      const self = this;
      const newMessage = {};

      newMessage.text = self.messagebar
        .getValue()
        .replace(/\n/g, '<br>')
        .trim();

      if (newMessage.text.length === 0) {
        // exit when empty messagebar text is empty
        return;
      }

      newMessage.attachments = this.attachments.slice();

      // Clear messagebar area
      self.messagebar.clear();

      // Focus area
      if (newMessage.text.length) self.messagebar.focus();

      // Add sent message
      // self.messagesData.push({ text, attachments });

      this.$store.dispatch('createMessage', {
        channelId: this.currentChannelId,
        ...newMessage
      });

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
      // References to us APIs
      this.messagebar = this.$refs.messagebar.f7Messagebar;
      this.messages = this.$refs.messages.f7Messages;
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
    },
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
    msgDateFormat: date => date
    // moment(date).format('MMMM Do YYYY, h:mm:ss a')
  },
  components: {
    Navbar
  },
  mounted() {
    const { teamId, channelId } = this;

    console.log('messages.mounted.teamId:', this.teamId);
    console.log('messages.mounted.channelId:', this.channelId);

    // Programmatic subscription
    // const observer = this.$apollo.subscribe({
    //   query: NEW_CHANNEL_MESSAGE,
    //   variables: {
    //     channelId
    //   }
    // });
    // observer.subscribe({
    //   next(data) {
    //     console.log('this.$apollo.subscribe', data);
    //   }
    // });

    // this.$store.commit('SET_CURRENT_TEAM_ID', this.teamId);

    // if (!teamId.isInteger || !channelId.isInteger) {
    //   this.$f7router.navigate('/not-found');

    //   console.log('GOTO: ERR PAGE');
    // }

    const channel = {
      teamId,
      channelId
    };

    // this.$store.dispatch('loadChannelMessages', channel);
    // this.$store.dispatch('subscribeToMessages', channel);
  }
  // destroyed() {
  //   this.$store.dispatch('unsubscribeFromMessages');
  // }
};
</script>


<style lang="stylus">
.messages {
    padding-bottom: 100px;
}
</style>
