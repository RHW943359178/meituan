import Router from 'koa-router';
import Redis from 'koa-redis';
import NodeMailer from 'nodemailer';
import User from '../dbs/modules/users';
import Passport from './utils/passport';
import Email from '../dbs/config'
import axios from './utils/axios'