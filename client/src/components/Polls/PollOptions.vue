<template>
  <div>
    <v-layout row>
      <v-flex>
        <div class="container">
          <v-list>
            <div
              v-for="option in options"
              :key="option.id"
              class="radio wrap">
              <input
                type="radio"
                name="radio"
                :value="option.id"
                v-model="selectedOption"
                :id="option.id"
                >
              <label :for="option.id" class="radio-label fontsize">{{option.name}}</label>
            </div>
          </v-list>
        </div>
        <slot></slot>
        <div>
          <v-btn
            v-if="!isAddOption"
            light
            class="btn-addoption"
            @click="isAddOption = true">
            Didn't you liked any of these options?
          </v-btn>
          <v-text-field
            v-if="isAddOption"
            autofocus
            label="Add your own !"
            v-model="optionName"
            ref="optionTextField"
            v-on:keyup.enter="addNewOption"
        ></v-text-field>
        </div>
      </v-flex>
    </v-layout>
      <v-btn
        class='green accent-2 vote'
        @click="$emit('vote', selectedOption)">
        Vote
      </v-btn>
  </div>
</template>

<script>
export default {
  props: [
    'options'
  ],
  data () {
    return {
      selectedOption: null,
      isAddOption: false,
      optionName: ''
    }
  },
  methods: {
    addNewOption () {
      if (!this.optionName) return
      this.$emit('addOption', this.optionName)
      this.isAddOption = false
      this.optionName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
$color1: #f4f4f4;
$color2: #3197EE;
.radio {
  margin: 0.5rem;
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    + .radio-label {
      &:before {
        content: '';
        background: $color1;
        border-radius: 100%;
        border: 1px solid darken($color1, 25%);
        display: inline-block;
        width: 1.4em;
        height: 1.4em;
        position: relative;
        top: 4px;
        margin-right: 1em; 
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
        font-size: 15px;
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          background-color: $color2;
          box-shadow: inset 0 0 0 4px $color1;
        }
      }
    }
    &:focus {
      + .radio-label {
        &:before {
          outline: none;
          border-color: $color2;
        }
      }
    }
    &:disabled {
      + .radio-label {
        &:before {
          box-shadow: inset 0 0 0 4px $color1;
          border-color: darken($color1, 25%);
          background: darken($color1, 25%);
        }
      }
    }
    + .radio-label {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
}
.wrap {
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 100%;
  padding: 10px;
},
.fontsize {
  font-size: 20px;
}
.vote {
  width: 150px;
}
.btn-addoption {
  text-transform: none;
}
.container {
  padding-bottom: 0px
}
</style>
